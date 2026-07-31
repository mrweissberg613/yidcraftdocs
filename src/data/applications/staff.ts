export const staffApplication = {
	title: "Staff Application",
	description: "Help keep YidCraft fun, fair, and welcoming for everyone.",
	type: "staff",
	fields: [
		{
			name: "minecraft",
			label: "Minecraft Username",
			type: "text",
			required: true,
			placeholder: "Steve"
		},
		{
			name: "discord",
			label: "Discord Username",
			type: "text",
			required: true,
			placeholder: "MrWeissberg"
		},
		{
			name: "age",
			label: "How old are you?",
			type: "text",
			required: true,
			placeholder: "22"
		},
		{
			name: "timezone",
			label: "What timezone or country are you in?",
			type: "text",
			required: true,
			placeholder: "USA EST"
		},
		{
			name: "playtime",
			label: "How many hours can you play per day/week?",
			type: "textarea",
			required: true
		},
		{
			name: "staff_experience",
			label: "Staff experience?",
			type: "textarea",
			required: true
		},
		{
			name: "moderation_experience",
			label: "Moderation experience?",
			type: "textarea",
			required: true
		},
		{
			name: "punishment_history",
			label: "Punishment history?",
			type: "textarea",
			required: true
		},
		{
			name: "spam_scenario",
			label: "Spam scenario:",
			type: "textarea",
			required: true
		},
		{
			name: "hacker_logs_off",
			label: "Hacker logs off:",
			type: "textarea",
			required: true
		},
		{
			name: "accused_of_unfairness",
			label: "Accused of unfairness:",
			type: "textarea",
			required: true
		},
		{
			name: "why_not_abuse_perms",
			label: "Why not abuse perms?",
			type: "textarea",
			required: true
		},
		{
			name: "why_staff",
			label: "Why staff?",
			type: "textarea",
			required: true
		},
		{
			name: "why_good_fit",
			label: "Why good fit?",
			type: "textarea",
			required: true
		},
		{
			name: "improvements",
			label: "Improvements?",
			type: "textarea",
			required: true
		},
		{
			name: "extra_info",
			label: "Extra info:",
			type: "textarea",
			required: false
		},
		{
			name: "preferred_role",
			label: "Preferred role:",
			type: "textarea",
			required: true
		}
	]
};

export const partnershipManagerApplication = {
	title: "Partnership Manager Application",
	description: "Help grow YidCraft through partnerships, collaborations, and community outreach.",
	type: "partnership-manager",
	fields: [
		{
			name: "minecraft",
			label: "Minecraft Username",
			type: "text",
			required: true,
			placeholder: "Steve"
		},
		{
			name: "discord",
			label: "Discord Username",
			type: "text",
			required: true,
			placeholder: "Partnerships"
		},
		{
			name: "discord_client_id",
			label: "Discord Client ID",
			type: "text",
			required: true,
			placeholder: "123456789012345678"
		},
		{
			name: "experience",
			label: "What partnership or community experience do you have?",
			type: "textarea",
			required: true
		},
		{
			name: "network",
			label: "What communities, creators, or groups could you help connect with YidCraft?",
			type: "textarea",
			required: true
		},
		{
			name: "goals",
			label: "What goals would you want to achieve as Partnership Manager?",
			type: "textarea",
			required: true
		},
		{
			name: "availability",
			label: "How often would you be available to work on partnerships?",
			type: "text",
			required: true,
			placeholder: "Several hours per week"
		},
		{
			name: "extra",
			label: "Anything else you'd like us to know?",
			type: "textarea",
			required: false
		}
	]
};

export const mediaApplication = {
	title: "Media Application",
	description: "Help create content, videos, and promotional material for YidCraft.",
	type: "media",
	fields: [
		{
			name: "minecraft",
			label: "Minecraft Username",
			type: "text",
			required: true,
			placeholder: "Steve"
		},
		{
			name: "discord",
			label: "Discord Username",
			type: "text",
			required: true,
			placeholder: "Media"
		},
		{
			name: "discord_client_id",
			label: "Discord Client ID",
			type: "text",
			required: true,
			placeholder: "123456789012345678"
		},
		{
			name: "experience",
			label: "What media or content creation experience do you have?",
			type: "textarea",
			required: true
		},
		{
			name: "platforms",
			label: "What platforms do you create content on?",
			type: "text",
			required: true,
			placeholder: "YouTube, TikTok, Instagram, etc."
		},
		{
			name: "ideas",
			label: "What ideas would you want to create for YidCraft?",
			type: "textarea",
			required: true
		},
		{
			name: "availability",
			label: "How often would you be available to create content?",
			type: "text",
			required: true,
			placeholder: "Several hours per week"
		},
		{
			name: "extra",
			label: "Anything else you'd like us to know?",
			type: "textarea",
			required: false
		}
	]
};

export const builderApplication = {
	title: "Builder Application",
	description: "Apply to help build the world of YidCraft.",
	type: "builder",
	fields: [
		{
			name: "minecraft",
			label: "Minecraft Username",
			type: "text",
			required: true,
			placeholder: "Steve"
		},
		{
			name: "discord",
			label: "Discord Username",
			type: "text",
			required: true,
			placeholder: "Builder"
		},
		{
			name: "discord_client_id",
			label: "Discord Client ID",
			type: "text",
			required: true,
			placeholder: "123456789012345678"
		},
		{
			name: "experience",
			label: "What building or design experience do you have?",
			type: "textarea",
			required: true
		},
		{
			name: "style",
			label: "What style of builds do you enjoy making?",
			type: "textarea",
			required: true
		},
		{
			name: "availability",
			label: "How often would you be available to build?",
			type: "text",
			required: true,
			placeholder: "Several hours per week"
		},
		{
			name: "extra",
			label: "Anything else you'd like us to know?",
			type: "textarea",
			required: false
		}
	]
};

export const testerApplication = {
	title: "Beta Tester Application",
	description: "Apply to help test upcoming features on YidCraft.",
	type: "tester",
	fields: [
		{
			name: "minecraft",
			label: "Minecraft Username",
			type: "text",
			required: true,
			placeholder: "Steve"
		},
		{
			name: "discord",
			label: "Discord Username",
			type: "text",
			required: true,
			placeholder: "Tester"
		},
		{
			name: "discord_client_id",
			label: "Discord Client ID",
			type: "text",
			required: true,
			placeholder: "123456789012345678"
		},
		{
			name: "experience",
			label: "What testing or bug-reporting experience do you have?",
			type: "textarea",
			required: true
		},
		{
			name: "platforms",
			label: "What kinds of features or updates would you like to test?",
			type: "textarea",
			required: true
		},
		{
			name: "availability",
			label: "How often would you be available to test?",
			type: "text",
			required: true,
			placeholder: "Several hours per week"
		},
		{
			name: "extra",
			label: "Anything else you'd like us to know?",
			type: "textarea",
			required: false
		}
	]
};

