import type { Actions, PageServerLoad } from "./$types"
import { prisma } from "$lib/server/prisma"
import { error, fail, redirect } from "@sveltejs/kit"

export const load: PageServerLoad = async () => {
	return {
		users: await prisma.user.findMany()
	}
}

export const actions: Actions = {
	deleteUser: async ({ url, locals }) => {
		const { user, session } = await locals.validateUser()
		if (!(user && session)) {
			throw redirect(302, "/")
		}
		const id = url.searchParams.get("id")
		if (!id) {
			return fail(400, { message: "Invalid request" })
		}

		try {
			const user = await prisma.user.findUniqueOrThrow({
				where: {
					id: id,
				},
			})

/* 			if (user.admin === false) {
				throw error(403, "Nicht autorisiert")
			} */

			await prisma.user.delete({
				where: {
					id: id,
				},
			})
		} catch (err) {
			console.error(err)
			return fail(500, {
				message: "Standrohr konnte nicht gelöscht werden.",
			})
		}

		return {
			status: 200,
		}
	},
}