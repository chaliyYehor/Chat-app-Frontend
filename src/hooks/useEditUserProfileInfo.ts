import { useMutation, useQueryClient } from '@tanstack/react-query'
import { editUserProfileInfo } from '../api/editUserProfileInfo'

export const useEditUserProfileInfo = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: editUserProfileInfo,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['userInfo'] })
		}
	})
}