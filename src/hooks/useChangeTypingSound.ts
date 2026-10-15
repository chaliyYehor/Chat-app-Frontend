import { useMutation, useQueryClient } from '@tanstack/react-query'
import { changeUserPreferences } from '../api/changeUserPreferences'

export const useChangeTypingSound = () => {
	const queryClient = useQueryClient()
 
	return useMutation({
		mutationFn: changeUserPreferences,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['userPreferences'] })
		},
	})
}
