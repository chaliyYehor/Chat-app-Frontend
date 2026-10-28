import { useInfiniteQuery } from '@tanstack/react-query'
import { getChatMessages } from '../api/getChatMessages'


export const useGetMessages = ({
	conversationId,
	limit,
}: {
	conversationId: string
	limit: number
}) => {
	return useInfiniteQuery({
		queryKey: ['messages', conversationId, 'infinite'],
		initialPageParam: 1,
		queryFn: ({ pageParam }) =>
			getChatMessages({ conversationId, page: pageParam, limit }),
		getNextPageParam: (lastPage, allPages) =>
			lastPage.hasMore ? allPages.length + 1 : undefined,
	})
}
