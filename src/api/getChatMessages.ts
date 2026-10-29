import { messagesSchema } from '../schemas/main/messages'
import { api } from './axios'

export const getChatMessages = async ({ conversationId, page, limit }: { conversationId: string, page: number, limit: number }) => {
	const response = await api.get('/api/chat/getMessages', {
		params: {
			conversationId,
			page,
			limit,
		}
	})

	return messagesSchema.parse(response.data)
}