import z from 'zod'

const groupSchema = z.object({
	id: z.string(),
	memberIds: z.array(z.string()),
	groupName: z.string(),
	groupDescription: z.string().nullable(),
	lastMessage: z.string().nullable(),
	lastMessageAt: z.coerce.date().nullable(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
})

const groupUserSchema = z.object({
	groupId: z.string(),
	userId: z.string(),
	role: z.enum(['admin', 'member']),
	lastReadMessageId: z.string().nullable(),
	unreadMessagesCount: z.number().int(),
	createdAt: z.coerce.date(),
})

export const groupsResponseSchema = z.object({
	groups: z.array(
		z.object({
			group: groupSchema,
			groupUser: groupUserSchema,
		}),
	),
})

export type GroupsResponse = z.infer<typeof groupsResponseSchema>
export type GroupResponse = GroupsResponse['groups'][number]
