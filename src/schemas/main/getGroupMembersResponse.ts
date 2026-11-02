import z from 'zod'

export const groupMemberSchema = z.object({
	userId: z.string(),
	name: z.string(),
	imageUrl: z.string().nullable(),
	about: z.string().nullable(),
	theme: z.enum(['light', 'dark']),
	status: z.enum(['online', 'offline']),
	previouslySetStatus: z.enum(['online', 'away', 'offline']),
	lastSeen: z.coerce.date(),
	role: z.enum(['admin', 'member']),
})

export const getGroupMembersResponseSchema = z.array(groupMemberSchema)

export type GroupMember = z.infer<typeof groupMemberSchema>
export type GetGroupMembersResponse = z.infer<
	typeof getGroupMembersResponseSchema
>
