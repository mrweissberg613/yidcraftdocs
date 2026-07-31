import dayjs from "dayjs";
import { nanoid } from "nanoid";
import db from "./database";

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

function parseRow(row: any): ApplicationRecord {
	return {
		id: row.id,
		application_id: row.application_id,
		type: row.type,
		minecraft: row.minecraft,
		discord: row.discord,
		status: row.status,
		answers: row.answers ? JSON.parse(row.answers) : {},
		admin_notes: row.admin_notes || "",
		submitted_at: row.submitted_at,
		reviewed_at: row.reviewed_at,
		reviewed_by: row.reviewed_by
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
	const applicationId = input.applicationId || `APP-${nanoid(8).toUpperCase()}`;
	const submittedAt = input.submittedAt || dayjs().toISOString();

	db.prepare(`
		INSERT INTO applications (
			application_id,
			type,
			minecraft,
			discord,
			status,
			answers,
			submitted_at
		)
		VALUES (
			?,
			?,
			?,
			?,
			?,
			?,
			?
		)
	`).run(
		applicationId,
		input.type,
		input.minecraft,
		input.discord,
		input.status || "Pending",
		JSON.stringify(input.answers),
		submittedAt
	);

	return getApplicationByApplicationId(applicationId);
}

export function getApplicationByApplicationId(applicationId: string) {
	const row = db.prepare(`
		SELECT * FROM applications
		WHERE application_id = ?
		LIMIT 1
	`).get(applicationId);

	return row ? parseRow(row) : null;
}

export function getApplicationById(id: number | string) {
	const row = db.prepare(`
		SELECT * FROM applications
		WHERE id = ?
		LIMIT 1
	`).get(Number(id));

	return row ? parseRow(row) : null;
}

export function listApplications(options: { search?: string; status?: string } = {}) {
	let query = `
		SELECT * FROM applications
		WHERE 1 = 1
	`;
	const params: Array<string | number> = [];

	if (options.search) {
		const searchValue = `%${options.search}%`;
		query += `
			AND (
				application_id LIKE ?
				OR type LIKE ?
				OR minecraft LIKE ?
				OR discord LIKE ?
				OR answers LIKE ?
			)
		`;
		params.push(searchValue, searchValue, searchValue, searchValue, searchValue);
	}

	if (options.status && options.status !== "All") {
		query += `
			AND status = ?
		`;
		params.push(options.status);
	}

	query += `
		ORDER BY submitted_at DESC
	`;

	const rows = db.prepare(query).all(...params);
	return rows.map(parseRow);
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
	const existing = getApplicationById(id);
	const fields: string[] = [];
	const values: Array<string | number> = [];

	if (updates.status) {
		fields.push("status = ?");
		values.push(updates.status);
	}

	if (updates.admin_notes !== undefined) {
		fields.push("admin_notes = ?");
		values.push(updates.admin_notes);
	}

	if (updates.reviewed_by !== undefined) {
		fields.push("reviewed_by = ?");
		values.push(updates.reviewed_by);
	}

	if (updates.reviewed_at !== undefined) {
		fields.push("reviewed_at = ?");
		values.push(updates.reviewed_at);
	}

	if (!fields.length) {
		return getApplicationById(id);
	}

	values.push(Number(id));

	db.prepare(`
		UPDATE applications
		SET ${fields.join(", ")}
		WHERE id = ?
	`).run(...values);

	const updated = getApplicationById(id);

	return updated;
}

export function deleteApplication(id: number | string) {
	return db.prepare(`
		DELETE FROM applications
		WHERE id = ?
	`).run(Number(id));
}
