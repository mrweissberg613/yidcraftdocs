import dayjs from "dayjs";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { nanoid } from "nanoid";

export interface ApplicationRecord {
	id: number;
	application_id: string;
	type: string;
	minecraft: string;
	discord: string;
	status: string;
	answers: Record<string, string>;
	admin_notes: string;
	submitted_at: string;
	reviewed_at: string | null;
	reviewed_by: string | null;
}

const isVercelRuntime = Boolean(process.env.VERCEL || process.env.ASTRO_OUTPUT);
const dataDir = isVercelRuntime
	? path.join(os.tmpdir(), "yidcraft-data")
	: path.join(process.cwd(), "data");
const storeFile = path.join(dataDir, "applications.json");

if (!fs.existsSync(dataDir)) {
	fs.mkdirSync(dataDir, { recursive: true });
}

function readApplications(): ApplicationRecord[] {
	if (!fs.existsSync(storeFile)) {
		return [];
	}

	try {
		const raw = fs.readFileSync(storeFile, "utf8");
		const parsed = JSON.parse(raw) as ApplicationRecord[];
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
}

function writeApplications(applications: ApplicationRecord[]) {
	fs.writeFileSync(storeFile, JSON.stringify(applications, null, 2));
}

function parseRecord(record: ApplicationRecord): ApplicationRecord {
	return {
		id: record.id,
		application_id: record.application_id,
		type: record.type,
		minecraft: record.minecraft,
		discord: record.discord,
		status: record.status,
		answers: record.answers || {},
		admin_notes: record.admin_notes || "",
		submitted_at: record.submitted_at,
		reviewed_at: record.reviewed_at || null,
		reviewed_by: record.reviewed_by || null
	};
}

export function createApplication(input: {
	type: string;
	minecraft: string;
	discord: string;
	status?: string;
	answers: Record<string, string>;
	applicationId?: string;
	submittedAt?: string;
}) {
	const applications = readApplications();
	const applicationId = input.applicationId || `APP-${nanoid(8).toUpperCase()}`;
	const submittedAt = input.submittedAt || dayjs().toISOString();
	const nextId = applications.reduce((max, item) => Math.max(max, item.id), 0) + 1;

	const record: ApplicationRecord = {
		id: nextId,
		application_id: applicationId,
		type: input.type,
		minecraft: input.minecraft,
		discord: input.discord,
		status: input.status || "Pending",
		answers: input.answers || {},
		admin_notes: "",
		submitted_at: submittedAt,
		reviewed_at: null,
		reviewed_by: null
	};

	applications.push(record);
	writeApplications(applications);

	return parseRecord(record);
}

export function getApplicationByApplicationId(applicationId: string) {
	const applications = readApplications();
	const record = applications.find((item) => item.application_id === applicationId);
	return record ? parseRecord(record) : null;
}

export function getApplicationById(id: number | string) {
	const applications = readApplications();
	const record = applications.find((item) => item.id === Number(id));
	return record ? parseRecord(record) : null;
}

export function listApplications(options: { search?: string; status?: string } = {}) {
	const applications = readApplications();
	let filtered = [...applications];

	if (options.search) {
		const searchValue = options.search.toLowerCase();
		filtered = filtered.filter((item) => {
			const haystack = [
				item.application_id,
				item.type,
				item.minecraft,
				item.discord,
				JSON.stringify(item.answers)
			].join(" ").toLowerCase();
			return haystack.includes(searchValue);
		});
	}

	if (options.status && options.status !== "All") {
		filtered = filtered.filter((item) => item.status === options.status);
	}

	return filtered
		.sort((a, b) => b.submitted_at.localeCompare(a.submitted_at))
		.map(parseRecord);
}

export function updateApplication(
	id: number | string,
	updates: {
		status?: string;
		admin_notes?: string;
		reviewed_by?: string;
		reviewed_at?: string;
	}
) {
	const applications = readApplications();
	const index = applications.findIndex((item) => item.id === Number(id));

	if (index === -1) {
		return null;
	}

	const current = applications[index];
	applications[index] = {
		...current,
		status: updates.status || current.status,
		admin_notes: updates.admin_notes !== undefined ? updates.admin_notes : current.admin_notes,
		reviewed_by: updates.reviewed_by !== undefined ? updates.reviewed_by : current.reviewed_by,
		reviewed_at: updates.reviewed_at !== undefined ? updates.reviewed_at : current.reviewed_at
	};

	writeApplications(applications);
	return parseRecord(applications[index]);
}

export function deleteApplication(id: number | string) {
	const applications = readApplications();
	const filtered = applications.filter((item) => item.id !== Number(id));
	writeApplications(filtered);
	return { deleted: filtered.length !== applications.length };
}
