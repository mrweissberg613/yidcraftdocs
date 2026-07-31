import type { APIRoute } from "astro";
import db from "../../lib/database";

export const GET: APIRoute = async () => {
	const row = db
		.prepare("SELECT COUNT(*) AS total FROM applications")
		.get();

	return new Response(
		JSON.stringify(row),
		{
			headers: {
				"Content-Type": "application/json"
			}
		}
	);
};