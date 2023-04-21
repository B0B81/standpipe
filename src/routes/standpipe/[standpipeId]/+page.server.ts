import type { Actions, PageServerLoad } from "./$types"
import { prisma } from "$lib/server/prisma"
import { redirect, error, fail } from "@sveltejs/kit"

export const load: PageServerLoad = async ({ params, locals }) => {
	const { user, session } = await locals.validateUser()
	if (!(user && session)) {
		throw error(401, "Unauthorized")
	}

	const getStandpipe = async (userId: string) => {
		const standpipe = await prisma.standpipe.findUnique({
			where: {
				id: Number(params.standpipeId),
			},
		})
		if (!standpipe) {
			throw error(404, "standpipe not found")
		}
/* 		if (standpipe.userId !== user.userId) {
			throw error(403, "Unauthorized")
		} */

		return standpipe
	}

	return {
		standpipe: getStandpipe(user.userId),
	}
}

export const actions: Actions = {
	updateStandpipe: async ({ request, params, locals }) => {
		const { user, session } = await locals.validateUser()
		if (!(user && session)) {
			throw error(401, "Unauthorized")
		}

		const { standpipeNr , manufacturer, type, productionYear,	meteringcode} = Object.fromEntries(await request.formData()) as {
			standpipeNr: number;
			manufacturer: string;
			type: string;
			productionYear: string;
			meteringcode: string;
        }

		try {
			const standpipe = await prisma.standpipe.findUniqueOrThrow({
				where: {
					id: Number(params.standpipeId),
				},
			})

/* 			if (standpipe.userId !== user.userId) {
				throw error(403, "Forbidden to edit this standpipe.")
			} */
			await prisma.standpipe.update({
				where: {
					id: Number(params.standpipeId),
				},
				data: {
					standpipeNr: parseInt(standpipeNr),
					manufacturer,
					type,
					productionYear,
					meteringcode,
					userId: user.userId,
				},
			})
		} catch (err) {
			console.error(err)
			return fail(500, { message: "Could not update standpipe" })
		}
		throw redirect(303, '/')	
	},
}