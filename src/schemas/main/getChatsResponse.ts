import z from 'zod'

const conversationSchema = z.object({
	id: z.string(),
	userOneId: z.string(),
	userTwoId: z.string(),
	lastMessage: z.string().nullable(),
	lastMessageAt: z.coerce.date().nullable(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
})

const conversationUserSchema = z.object({
	conversationId: z.string(),
	userId: z.string(),
	isPinned: z.boolean(),
	lastReadMessageId: z.string().nullable(),
	unreadMessagesCount: z.number().int(),
	createdAt: z.coerce.date(),
})

export const chatUserSchema = z
	.object({
		userId: z.string(),
		name: z.string(),
		imageUrl: z.string().nullable(),
		status: z.enum(['online', 'offline']),
		previouslySetStatus: z.enum(['online', 'away', 'offline']),
		lastSeen: z.coerce.date(),
	})
	.nullable()

export const chatsResponseSchema = z.array(
	z.object({
		conversation: conversationSchema,
		conversationUser: conversationUserSchema,
		userOne: chatUserSchema,
		userTwo: chatUserSchema,
	}),
)

export type ChatsResponse = z.infer<typeof chatsResponseSchema>
export type ChatResponse = ChatsResponse[number]
