import { useQuery } from '@tanstack/react-query'
import { getUserInfoChat } from '../api/getUserInfoChat'

export const useGetUserInfoChat = (conversationId: string | undefined) => {
	return useQuery({
		queryKey: ['userInfoChat', conversationId],
		enabled: Boolean(conversationId),
		staleTime: 30_000,
		queryFn: () => {
			if (!conversationId) {
				throw new Error('Conversation ID is required')
			}

			return getUserInfoChat({ conversationId })
		},
	})
}
