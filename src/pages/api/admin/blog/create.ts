import type { APIRoute } from "astro";
import { Octokit } from "octokit";


export const POST: APIRoute = async ({ request, url }) => {


	try {


		const data =
			await request.formData();



		const title =
			String(
				data.get("title") || "Untitled"
			);



		const content =
			String(
				data.get("body") || ""
			);



		const customDate =
			String(
				data.get("date") || ""
			);



		const useNow =
			data.get("useNow") === "on";



		const postDate =
			useNow || !customDate
				? new Date()
				: new Date(customDate);



		const formattedDate =
			postDate
				.toISOString()
				.split("T")[0];



		const slug =
			title
				.toLowerCase()
				.replace(/[^a-z0-9]+/g, "-")
				.replace(/^-|-$/g, "");



		const file = `---
title: "${title}"
date: ${formattedDate}
---

# ${title}

${content}
`;



		const token =
			import.meta.env.GITHUB_TOKEN;



		const owner =
			import.meta.env.GITHUB_OWNER;



		const repo =
			import.meta.env.GITHUB_REPO;



		if (!token || !owner || !repo) {

			return new Response(
				JSON.stringify({
					success:false,
					message:"GitHub configuration missing"
				}),
				{
					status:500
				}
			);

		}



		const octokit =
			new Octokit({
				auth: token
			});



		const filePath =
			`src/content/docs/blog/${slug}.mdx`;



		await octokit.rest.repos.createOrUpdateFileContents({

			owner,

			repo,

			path:filePath,

			message:
				`Create blog post: ${title}`,

			content:
				Buffer
					.from(file)
					.toString("base64")

		});



		return Response.redirect(

			new URL(
				`/admin/blog/success?title=${encodeURIComponent(title)}`,
				url
			),

			302

		);


	}

	catch(error) {


		console.error(error);


		return new Response(

			JSON.stringify({

				success:false,

				message:"Failed creating blog post"

			}),

			{
				status:500
			}

		);

	}

};