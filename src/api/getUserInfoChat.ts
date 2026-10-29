import { getUserInfoChatSchema } from '../schemas/main/getUserInfoChat'
import { api } from './axios'

export const getUserInfoChat = async ({ conversationId }: { conversationId: string }) => {
	const result = await api.get('/api/user/getUserInfoChat', {
		params: {
			conversationId: conversationId
		}
	})

	return getUserInfoChatSchema.parse(result.data)
}
