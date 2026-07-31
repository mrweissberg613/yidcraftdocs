import type { APIRoute } from "astro";
import { deleteApplication, getApplicationById, updateApplication } from "../../../lib/applications";

export const GET: APIRoute = async ({ params }) => {
	const id = Number(params.id);
	const application = getApplicationById(id);

	if (!application) {
		return new Response(JSON.stringify({ success: false, error: "Application not found." }), {
			status: 404,
			headers: {
				"Content-Type": "application/json"
			}
		});
	}

	return new Response(JSON.stringify(application), {
		status: 200,
		headers: {
			"Content-Type": "application/json"
		}
	});
};

export const PATCH: APIRoute = async ({ params, request }) => {
	const id = Number(params.id);
	const body = await request.json();

	const updated = updateApplication(id, {
		status: body.status,
		admin_notes: body.admin_notes,
		reviewed_by: body.reviewed_by,
		reviewed_at: body.reviewed_at
	});

	return new Response(JSON.stringify({ success: true, application: updated }), {
		status: 200,
		headers: {
			"Content-Type": "application/json"
		}
	});
};

export const DELETE: APIRoute = async ({ params }) => {
	const id = Number(params.id);
	deleteApplication(id);

	return new Response(JSON.stringify({ success: true }), {
		status: 200,
		headers: {
			"Content-Type": "application/json"
		}
	});
};
