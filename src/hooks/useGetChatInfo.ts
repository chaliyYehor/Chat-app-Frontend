import { useQuery } from '@tanstack/react-query'
import { getChatInfo } from '../api/getChatInfo'

export const useGetChatInfo = (conversationId: string | undefined) => {
	return useQuery({
		queryKey: ['chatInfo', conversationId],
		enabled: Boolean(conversationId),
		staleTime: 30_000,
		queryFn: () => {
			if (!conversationId) {
				throw new Error('Conversation ID is required')
			}

			return getChatInfo({ conversationId })
		},
	})
}
