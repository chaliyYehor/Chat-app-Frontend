import { useQuery } from '@tanstack/react-query'
import { getChatMessages } from '../api/getChatMessages'

export const useGetMessages = ({ conversationId, page, limit }: { conversationId: string, page: number, limit: number }) => {
	return useQuery({
		queryKey: ['messages', conversationId],
		queryFn: () => getChatMessages({conversationId, page, limit}),
	})
}