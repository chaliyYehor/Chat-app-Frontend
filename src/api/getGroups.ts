import { groupsResponseSchema } from '../schemas/main/getGroupsResponse'
import { api } from './axios'

export const getGroups = async () => {
	const response = await api.get('/api/chat/getGroups')

	return groupsResponseSchema.parse(response.data)
}
