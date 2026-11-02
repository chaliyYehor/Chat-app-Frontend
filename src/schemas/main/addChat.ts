import z from 'zod'

export const addChatSchema = z.object({
	search: z.string(),
})

export type AddChatType = z.infer<typeof addChatSchema>

export const chatResponseSchema = z.object({
	userId: z.string(),
	name: z.string(),
	imageUrl: z.string().nullable(),
	status: z.enum(['online', 'offline']),
	previouslySetStatus: z.enum(['online', 'away', 'offline']),
})

export const addChatResponseSchema = z.array(chatResponseSchema)

export type PersonType = z.infer<typeof chatResponseSchema>
export type AddChatResponseType = z.infer<typeof chatResponseSchema>