import z from 'zod'

export const userProfileSchema = z.object({
	userId: z.string(),
	profilePicture: z.string().nullable(),
	about: z.string().nullable(),
	userPubId: z.string(),
	name: z.string(),
	theme: z.enum(['light', 'dark']),
	status: z.enum(['online', 'away', 'offline']),
	lastSeen: z.coerce.date(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
})

export type UserProfile = z.infer<typeof userProfileSchema>
