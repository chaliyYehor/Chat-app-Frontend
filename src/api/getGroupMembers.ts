import { getGroupMembersResponseSchema } from '../schemas/main/getGroupMembersResponse'
import { api } from './axios'

export const getGroupMembers = async ({groupId}: {groupId: string}) => {
	const result = await api.get('/api/user/getGroupMembers', {
		params: {
			groupId,
		}
	})

	return getGroupMembersResponseSchema.parse(result.data)
}