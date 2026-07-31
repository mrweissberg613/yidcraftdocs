import dayjs from "dayjs";

interface DiscordApplicationPayload {
	applicationId: string;
	type: string;
	minecraft: string;
	discord: string;
	status?: string;
	submittedAt: string;
	answers: Record<string, string>;
}

export async function sendApplicationStatusDM(_application: {
	application_id: string;
	status: string;
	minecraft: string;
	discord: string;
	admin_notes: string;
	answers: Record<string, string>;
}) {
	return;
}

export async function sendApplicationDiscordMessage(
	payload: DiscordApplicationPayload
) {
	const webhookUrl = import.meta.env.DISCORD_APPLICATION_WEBHOOK;

	if (!webhookUrl) {
		console.info("Discord application webhook is not configured.");
		return;
	}

	const status = payload.status || "Pending";
	const statusColor = status === "Approved" ? 0x22c55e : status === "Denied" ? 0xef4444 : 0x3b82f6;
	const summaryFields = [
		{
			name: "Application ID",
			value: payload.applicationId
		},
		{
			name: "Type",
			value: payload.type
		},
		{
			name: "Status",
			value: status
		},
		{
			name: "Submitted",
			value: dayjs(payload.submittedAt).format("YYYY-MM-DD HH:mm:ss")
		}
	];

	const answerFields = Object.entries(payload.answers)
		.slice(0, 6)
		.map(([question, answer]) => ({
			name: question,
			value: answer || "No answer provided"
		}));

	try {
		const response = await fetch(webhookUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				embeds: [
					{
						title: `New ${payload.type} Application`,
						description: `**Minecraft:** ${payload.minecraft}\n**Discord:** ${payload.discord}\n**Status:** ${status}`,
						color: statusColor,
						fields: [...summaryFields, ...answerFields],
						timestamp: payload.submittedAt
					}
				]
			})
		});

		if (!response.ok) {
			throw new Error(`Webhook responded with ${response.status}`);
		}
	} catch (error) {
		console.error("Discord webhook delivery failed.", error);
	}
}
