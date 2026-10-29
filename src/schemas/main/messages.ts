import z from 'zod'

export const messagesSchema = z.object({
	messages: z.array(z.object({
		conversationId: z.string().min(1, 'Conversation ID is required'),
		id: z.string().min(1, 'Message ID is required'),
		senderId: z.string().min(1, 'Sender ID is required'),
		createdAt: z.coerce.date(),
		read: z.boolean().optional(),
		type: z.enum(['text_or_image', 'image']).default('text_or_image'),
		text: z.string().max(1000, 'Text must be less than 1000 characters').nullable(),
		imageUrl: z.string().url('Invalid image URL').nullable(),
		imagePubId: z.string().min(1, 'Image Public ID is required').nullable(),
	})),
	hasMore: z.boolean(),
})

export type Message = z.infer<typeof messagesSchema>['messages'][number]
export type Messages = z.infer<typeof messagesSchema>
