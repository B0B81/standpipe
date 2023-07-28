import type { Actions, PageServerLoad } from "./$types"
import { prisma } from "$lib/server/prisma"
import { fail, redirect } from "@sveltejs/kit"
import { standpipeSchema } from '$lib/zod/schema'
import { superValidate } from "sveltekit-superforms/server"

export async function load( { params }) {
	const page = Number(params.page)
	async function getStandpipes() {
		const limit = 10
		const standpipes = await prisma.standpipe.findMany({
			skip: (page -1) * limit,
			take: limit,
			orderBy: [
				{standpipeNr: 'asc',}
			],
		})
		return standpipes
	}
	
	async function getManufacturers() {
		const manufacturers = await prisma.manufacturer.findMany({
			orderBy: [
				{companyname: 'asc',}
			],
		})
		return manufacturers
	}
	const form = await superValidate(standpipeSchema)

	return {
		standpipes: getStandpipes(),
		totalStandpipes: prisma.standpipe.count(),
		manufacturers: getManufacturers(),
		form
	}
}

export const actions: Actions = {
	createStandpipe: async ({ locals, request }) => {
		const { user, session } = await locals.validateUser()
		if (!(user && session)) {
			throw redirect(302, "/")
		}
		const data = await request.formData()
		const form = await superValidate(data, standpipeSchema)
		console.log(form)

		if (!form.valid) {
			console.log('form validation error')
			return fail(400, { form, message: 'Invalid input' })
		}

		try {
			await prisma.standpipe.create({
				data: {
					standpipeNr: form.data.standpipeNr,
					manufacturer: form.data.manufacturer,
					type: form.data.type,
					productionYear: form.data.productionYear,
					meteringcode: form.data. meteringcode,
					userId: user.userId,
				},
			})
			console.log('standpipe created')
		} catch (err) {
			console.error(err)
			return fail(500, { message: "Standrohr konnte nicht erstellt werden." })
		}

		return {
			status: 201,
		}
	},

	deleteStandpipe: async ({ url, locals }) => {
		const { user, session } = await locals.validateUser()
		if (!(user && session)) {
			throw redirect(302, "/")
		}
		const id = url.searchParams.get("id")
		if (!id) {
			return fail(400, { message: "Invalid request" })
		}

		try {
			const standpipe = await prisma.standpipe.findUniqueOrThrow({
				where: {
					id: Number(id),
				},
			})

/* 			if (user.admin === false) {
				throw error(403, "Nicht autorisiert")
			} */

			await prisma.standpipe.delete({
				where: {
					id: Number(id),
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