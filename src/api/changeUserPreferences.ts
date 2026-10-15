import { api } from './axios'

export const changeUserPreferences = async (body: { type: 'typingSounds' | 'messageSounds' | 'lastSeen' | 'readReceipts', value: boolean }) => {
	const res = await api.patch('/api/user/changeUserPreferences', body)

	return res.data
}