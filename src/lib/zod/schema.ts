import { z } from "zod"

export const standpipeSchema = z.object({
	standpipeNr: z.number({required_error: 'Nummer ist erforderlich'}).positive().default('' as number),
	manufacturer: z.string({required_error: 'Hersteller ist erforderlich'}).min(2, { message: 'Hersteller ist erforderlich'}).max(64).trim(),
	type: z.string({required_error: 'Typ ist erforderlich'}).min(1).max(64).trim(),
	productionYear: z.string({required_error: 'Baujahr ist erforderlich'}).min(1).max(4).trim(),
	meteringcode: z.string({required_error: 'Zählernummer ist erforderlich'}).min(5).max(10).trim(),
})