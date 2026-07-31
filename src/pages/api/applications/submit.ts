import type { APIRoute } from "astro";
import { z } from "zod";
import dayjs from "dayjs";
import { createApplication } from "../../../lib/applications";
import { sendApplicationDiscordMessage } from "../../../lib/discord";

const ApplicationSchema = z.object({
	type: z.string().min(1),
	minecraft: z.string().min(3).max(16),
	discord: z.string().min(2).max(50),
	status: z.string().optional(),
	answers: z.record(z.string(), z.string())
});

export const POST: APIRoute = async ({ request }) => {
	try {
		const body = await request.json();

		const data = ApplicationSchema.parse(body);

		const created = createApplication({
			type: data.type,
			minecraft: data.minecraft,
			discord: data.discord,
			status: data.status || "Pending",
			answers: data.answers,
			applicationId: body.applicationId,
			submittedAt: body.submittedAt || dayjs().toISOString()
		});

		if (created) {
			void sendApplicationDiscordMessage({
				applicationId: created.application_id,
				type: created.type,
				minecraft: created.minecraft,
				discord: created.discord,
				status: created.status,
				submittedAt: created.submitted_at,
				answers: created.answers
			});
		}

		return new Response(
			JSON.stringify({
				success: true,
				applicationId: created?.application_id
			}),
			{
				status: 200,
				headers: {
					"Content-Type": "application/json"
				}
			}
		);

	} catch (error) {
		console.error(error);

		return new Response(
			JSON.stringify({
				success: false,
				error: "Invalid application."
			}),
			{
				status: 400,
				headers: {
					"Content-Type": "application/json"
				}
			}
		);
	}
};