import type { APIRoute } from "astro";
import fs from "node:fs";
import path from "node:path";
import { isAuthenticated } from "../../lib/auth";

export const POST: APIRoute = async ({ request, cookies }) => {

	if (!isAuthenticated(cookies)) {
		return new Response("Unauthorized", {
			status: 401
		});
	}

	const form = await request.formData();

	const file = form.get("file");

	if (!(file instanceof File)) {
		return new Response("No file", {
			status: 400
		});
	}


	const buffer = Buffer.from(
		await file.arrayBuffer()
	);


	const uploadPath = path.join(
		process.cwd(),
		"public/images"
	);


	if (!fs.existsSync(uploadPath)) {
		fs.mkdirSync(uploadPath, {
			recursive: true
		});
	}


	const fileName =
		Date.now() +
		"-" +
		file.name.replace(/\s+/g, "-");


	fs.writeFileSync(
		path.join(uploadPath, fileName),
		buffer
	);


	return new Response(
		JSON.stringify({
			url: `/images/${fileName}`
		}),
		{
			headers: {
				"Content-Type": "application/json"
			}
		}
	);
};