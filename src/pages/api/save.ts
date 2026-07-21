import type { APIRoute } from "astro";
import { Octokit } from "octokit";


const octokit = new Octokit({

	auth: import.meta.env.GITHUB_TOKEN

});



export const POST: APIRoute = async ({ request }) => {


	try {


		const body = await request.json();


		const path = body.path;

		const content = body.content;



		if (!path || !content) {


			return new Response(

				JSON.stringify({

					error: "Missing path or content"

				}),

				{
					status:400
				}

			);

		}




		const owner =
			import.meta.env.GITHUB_OWNER;


		const repo =
			import.meta.env.GITHUB_REPO;





		const filePath =
			`src/content/docs/${path}.mdx`;







		// Get existing file from GitHub

		const file = await octokit.request(

			"GET /repos/{owner}/{repo}/contents/{path}",

			{

				owner,

				repo,

				path:filePath

			}

		);







		// Make sure this is a file

		if (!("sha" in file.data)) {


			throw new Error(
				"GitHub file not found"
			);

		}





		const sha = file.data.sha;








		// Update file and create commit

		await octokit.request(

			"PUT /repos/{owner}/{repo}/contents/{path}",

			{

				owner,

				repo,

				path:filePath,


				message:

				`Update ${path} from YidCraft Admin`,



				content:

				Buffer
				.from(content)
				.toString("base64"),



				sha

			}

		);






		return new Response(

			JSON.stringify({

				success:true,

				message:"Saved to GitHub"

			}),

			{

				status:200

			}

		);



	}

	catch(error){


		console.error(
			"GitHub Save Error:",
			error
		);



		return new Response(

			JSON.stringify({

				error:
				"Failed to save to GitHub"

			}),

			{

				status:500

			}

		);


	}

};