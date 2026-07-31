import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";

const dataDir = path.join(process.cwd(), "data");

if (!fs.existsSync(dataDir)) {
	fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, "yidcraft.db");

const db = new Database(dbPath);

db.pragma("journal_mode = WAL");

db.exec(`
CREATE TABLE IF NOT EXISTS applications (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	application_id TEXT NOT NULL UNIQUE,
	type TEXT NOT NULL,
	minecraft TEXT NOT NULL,
	discord TEXT NOT NULL,
	status TEXT NOT NULL DEFAULT 'Pending',
	answers TEXT NOT NULL,
	admin_notes TEXT DEFAULT '',
	submitted_at TEXT NOT NULL,
	reviewed_at TEXT,
	reviewed_by TEXT
);
`);

export default db;