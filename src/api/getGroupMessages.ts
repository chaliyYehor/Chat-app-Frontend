import { getGroupMessagesResponseSchema } from '../schemas/main/getGroupMessagesResponse'
import { api } from './axios'

export const getGroupMessages = async ({
	groupId,
	page,
	limit,
}: {
	groupId: string
	page: number
	limit: number
}) => {
	const response = await api.get('/api/chat/getGroupMessages', {
		params: {
			groupId,
			page,
			limit,
		},
	})

	return getGroupMessagesResponseSchema.parse(response.data)
}
