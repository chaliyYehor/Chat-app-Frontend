import { userPreferencesSchema } from '../schemas/main/userPreferences'
import { api } from './axios'

export const getUserPreferences = async () => {
	const response = await api.get('/api/user/getUserPreferences')
	return userPreferencesSchema.parse(response.data)
}