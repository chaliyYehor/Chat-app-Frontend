import { chatsResponseSchema } from '../schemas/main/getChatsResponse'
import { api } from './axios'

export const getChats = async () => {
	const response = await api.get('/api/chat/getChats')

	return chatsResponseSchema.parse(response.data)
}