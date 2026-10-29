import { useQuery } from '@tanstack/react-query'
import { getChats } from '../api/getChats'

export const useGetChats = () => {
	return useQuery({
		queryKey: ['chats'],
		queryFn: getChats
	})
}