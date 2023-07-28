import type { Actions, PageServerLoad } from "./$types"
import { prisma } from "$lib/server/prisma"
import { redirect, error, fail } from "@sveltejs/kit"


export const load: PageServerLoad = async ({ params, locals }) => {
	const { user, session } = await locals.validateUser()
	if (!(user && session)) {
		throw error(401, "Unauthorized")
	}

	const getManufacturer = async (userId: string) => {
		const manufacturer = await prisma.manufacturer.findUnique({
			where: {
				id: Number(params.manufacturerId),
			},
		})
		if (!manufacturer) {
			throw error(404, "manufacturer not found")
		}
/* 		if (manufacturer.userId !== user.userId) {
			throw error(403, "Unauthorized")
		} */

		return manufacturer
	}
	return {
		manufacturer: getManufacturer(user.userId)
	}


}

export const actions: Actions = {
	updateManufacturer: async ({ request, params, locals }) => {
		const { user, session } = await locals.validateUser()
		if (!(user && session)) {
			throw error(401, "Unauthorized")
		}

		const { companyname } = Object.fromEntries(await request.formData()) as {
			companyname: string;
        }

		try {
			const manufacturer = await prisma.manufacturer.findUniqueOrThrow({
				where: {
					id: Number(params.manufacturerId),
				},
			})

/* 			if (manufacturer.userId !== user.userId) {
				throw error(403, "Forbidden to edit this manufacturer.")
			} */
			await prisma.manufacturer.update({
				where: {
					id: Number(params.manufacturerId),
				},
				data: {
					companyname,
					userId: user.userId,
				},
			})
		} catch (err) {
			console.error(err)
			return fail(500, { message: "Could not update manufacturer" })
		}
		throw redirect(303, '/manufacturer')	
	},
}