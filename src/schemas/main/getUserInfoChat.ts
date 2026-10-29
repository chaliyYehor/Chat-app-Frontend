import z from 'zod'

export const getUserInfoChatSchema = z.object({
	userId: z.string(),
	email: z.email(),
	name: z.string(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
	status: z.enum(['online', 'offline']),
	imageUrl: z.string().nullable(),
	about: z.string().nullable(),
	userPubId: z.string(),
	previouslySetStatus: z.enum(['online', 'away', 'offline']),
	lastSeen: z.coerce.date().optional(),
})

export type GetUserInfoChat = z.infer<typeof getUserInfoChatSchema>
