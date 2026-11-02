import { chatResponseSchema } from '../schemas/main/addChat'
import { api } from './axios'

export const getCreator = async () => {
	const res = await api.get('/api/chat/getCreator')

	return chatResponseSchema.parse(res.data)
}
