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

	const staffQuestionLabels: Record<string, string> = {
		age: "How old are you?",
		timezone: "What timezone or country are you in?",
		playtime: "How many hours can you play per day/week?",
		staff_experience: "Staff experience?",
		moderation_experience: "Moderation experience?",
		punishment_history: "Punishment history?",
		spam_scenario: "Spam scenario:",
		hacker_logs_off: "Hacker logs off:",
		accused_of_unfairness: "Accused of unfairness:",
		why_not_abuse_perms: "Why not abuse perms?",
		why_staff: "Why staff?",
		why_good_fit: "Why good fit?",
		improvements: "Improvements?",
		extra_info: "Extra info:",
		preferred_role: "Preferred role:"
	};

	const answerFields = Object.entries(payload.answers)
		.filter(([key]) => key !== "minecraft" && key !== "discord")
		.map(([key, answer]) => {
			const label = payload.type === "staff" ? staffQuestionLabels[key] || key : key;
			return {
				name: label,
				value: answer || "No answer provided"
			};
		});

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
						description: `**Applicant:** Discord- ${payload.discord} | MC- ${payload.minecraft}\n\n**Status:** ${status}`,
						color: statusColor,
						fields: answerFields,
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
