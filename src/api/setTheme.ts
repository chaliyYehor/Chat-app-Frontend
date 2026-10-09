import { api } from './axios'

export const setThemeDB = async ({ theme }: { theme: 'dark' | 'light' }) => {
	const response = await api.patch('/api/user/changeTheme', { theme })

	return response.data
}
