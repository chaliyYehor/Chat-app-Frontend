import { chatSchema } from '../schemas/main/getChatInfo'
import { api } from './axios'

export const getChatInfo = async ({ conversationId }: { conversationId: string }) => {
	const result = await api.get('/api/user/getChatInfo', {
		params: {
			conversationId: conversationId
		}
	})

	return chatSchema.parse(result.data)
}
