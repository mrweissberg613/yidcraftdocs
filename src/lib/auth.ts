import jwt from "jsonwebtoken";


const SECRET = import.meta.env.JWT_SECRET;


if (!SECRET) {

	throw new Error(
		"JWT_SECRET is missing from .env"
	);

}



export function createSession(
	username: string
) {

	return jwt.sign(

		{
			username
		},

		SECRET,

		{
			expiresIn: "7d"
		}

	);

}





export function verifySession(
	token: string
) {

	try {

		return jwt.verify(

			token,

			SECRET

		);

	}

	catch {

		return null;

	}

}





export function isAuthenticated(
	cookies: any
) {

	const token =
		cookies.get("admin_session")?.value;


	if (!token) {

		return false;

	}


	return !!verifySession(token);

}