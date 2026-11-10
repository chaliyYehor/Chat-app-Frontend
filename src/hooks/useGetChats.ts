import { useQuery } from '@tanstack/react-query'
import { getChats } from '../api/getChats'

export const useGetChats = (enabled = true) => {
	return useQuery({
		queryKey: ['chats'],
		queryFn: getChats,
		enabled,
		staleTime: 30_000,
	})
}
