// routes/login/+page.server.ts
import { error, fail, redirect } from "@sveltejs/kit";
import { auth } from "$lib/server/lucia";
import type { PageServerLoad, Actions } from "./$types";

// If the user exists, redirect authenticated users to the profile page.
export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.validate();
	if (session) throw redirect(302, "/");
	return {};
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = await request.formData();
		const username = form.get("username");
		const password = form.get("password");
		
		// check for empty values
		if (typeof username !== "string" || typeof password !== "string")
			return fail(400);
		try {
			const key = await auth.validateKeyPassword(
				"username",
				username,
				password
			);
			const session = await auth.createSession(key.userId);
			locals.setSession(session);
		} catch (err) {
			// invalid credentials
			console.log("Error: ", err);
			throw error(err.status, err.message);
			return fail(400);
		}
	}
};