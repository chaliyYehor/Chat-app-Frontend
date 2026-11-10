import { useQuery } from '@tanstack/react-query'
import { getUserInfo } from '../api/getUserInfo'

export const useGetUserInfo = () => {
	return useQuery({
		queryKey: ['userInfo'],
		queryFn: getUserInfo,
		staleTime: 30_000,
	})
}
