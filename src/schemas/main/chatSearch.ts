import z from 'zod'

export const chatSearchSchema = z.object({
	search: z
		.string()
})

export type ChatSearch = z.infer<typeof chatSearchSchema>
