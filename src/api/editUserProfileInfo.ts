import { api } from './axios'

export const editUserProfileInfo = async (data: FormData) => {
	const result = await api.patch('/api/user/editUserProfileInfo', data)

	return result.data
}