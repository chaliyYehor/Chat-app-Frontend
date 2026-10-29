import z from 'zod'

export const conversationDataSchema = z.object({
    id: z.string(),
    userOneId: z.string(),
    userTwoId: z.string(),
    lastMessage: z.string().nullable(),
    lastMessageAt: z.coerce.date().nullable(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
})

export const conversationUserDataSchema = z.object({
    conversationId: z.string(),
    userId: z.string(),
    isPinned: z.boolean(),
    lastReadMessageId: z.string().nullable(),
    unreadMessagesCount: z.number().int(),
    createdAt: z.coerce.date(),
})

export const chatSchema = z.object({
    conversationData: conversationDataSchema,
    conversationUserData: conversationUserDataSchema,
})