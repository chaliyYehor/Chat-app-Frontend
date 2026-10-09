import { useMutation } from '@tanstack/react-query'
import { setThemeDB } from '../api/setTheme'

export const useSetTheme = () => {
	return useMutation({
		mutationFn: setThemeDB
	})
}