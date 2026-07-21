import type { APIRoute } from "astro";
import bcrypt from "bcryptjs";
import { createSession } from "../../lib/auth";


export const POST: APIRoute = async ({ request, cookies }) => {

	try {

		const {
			username,
			password
		} = await request.json();


		console.log("Entered username:", username);
		console.log("Expected username:", import.meta.env.ADMIN_USERNAME);


		if (username !== import.meta.env.ADMIN_USERNAME) {

			console.log("FAILED: username");

			return new Response("Invalid username", {
				status: 401
			});

		}



		const hash = import.meta.env.ADMIN_PASSWORD_HASH;


		console.log(
			"Hash length:",
			hash?.length
		);



		const valid = await bcrypt.compare(
			password,
			hash
		);



		console.log(
			"Password valid:",
			valid
		);



		if (!valid) {

			console.log("FAILED: password");

			return new Response("Invalid password", {
				status: 401
			});

		}



		const token = createSession(username);



		cookies.set(
			"admin_session",
			token,
			{
				httpOnly: true,
				secure: import.meta.env.PROD,
				sameSite: "strict",
				maxAge: 60 * 60 * 24 * 7,
				path: "/"
			}
		);



		return new Response(
			JSON.stringify({
				success: true
			}),
			{
				status: 200,
				headers:{
					"Content-Type":"application/json"
				}
			}
		);



	} catch(error) {

		console.error(error);

		return new Response("Server error", {
			status:500
		});

	}

};