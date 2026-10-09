import { userProfileSchema } from '../schemas/main/userProfile'
import { api } from './axios'

export const getUserInfo = async () => {
	const response = await api.get('/api/user/getUserInfo')

	return userProfileSchema.parse(response.data)
}