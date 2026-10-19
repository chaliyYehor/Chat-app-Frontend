import { addChatResponseSchema } from '../schemas/main/addChat'
import { api } from './axios'

export const addChat = async (search: string) => {
	const response = await api.get('/api/chat/searchPerson', {
		params: {
			search
		}
	})

	return addChatResponseSchema.parse(response.data)
}