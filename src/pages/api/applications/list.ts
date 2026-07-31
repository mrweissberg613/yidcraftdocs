import type { APIRoute } from "astro";
import { listApplications } from "../../../lib/applications";

export const GET: APIRoute = async ({ url }) => {
	const search = url.searchParams.get("search") || "";
	const status = url.searchParams.get("status") || "All";

	const applications = listApplications({ search, status });

	return new Response(JSON.stringify(applications), {
		status: 200,
		headers: {
			"Content-Type": "application/json"
		}
	});
};
