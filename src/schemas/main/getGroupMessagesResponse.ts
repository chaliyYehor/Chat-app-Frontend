import z from 'zod'
import { getUserInfoChatSchema } from './getUserInfoChat'

export const groupMessageSchema = z.object({
	id: z.string().min(1),
	conversationId: z.string().nullable(),
	groupId: z.string().min(1),
	senderId: z.string().min(1),
	createdAt: z.coerce.date(),
	read: z.boolean(),
	type: z.enum(['text_or_image', 'image']),
	text: z.string().nullable(),
	imageUrl: z.string().nullable(),
	imagePubId: z.string().nullable(),
	senderInfo: getUserInfoChatSchema,
})

export const getGroupMessagesResponseSchema = z.object({
	messages: z.array(groupMessageSchema),
	hasMore: z.boolean(),
})

export type GroupMessage = z.infer<typeof groupMessageSchema>
export type GetGroupMessagesResponse = z.infer<
	typeof getGroupMessagesResponseSchema
>
