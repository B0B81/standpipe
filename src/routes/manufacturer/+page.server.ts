import type { Actions, PageServerLoad } from "./$types"
import { prisma } from "$lib/server/prisma"
import { fail, redirect } from "@sveltejs/kit"
// import { standpipeSchema } from '$lib/zod/schema'
//import { superValidate } from "sveltekit-superforms/server"

export const load: PageServerLoad = async (event) => {
	const manufacturers = await prisma.manufacturer.findMany({
		orderBy: [
			{id: 'asc',}
		],
	})
	return {
		manufacturers
	}
}