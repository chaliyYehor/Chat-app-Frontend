import { useInfiniteQuery } from '@tanstack/react-query'
import { getGroupMessages } from '../api/getGroupMessages'


export const useGetGroupMessages = ({
	groupId,
	limit,
}: {
	groupId: string
	limit: number
}) => {
	return useInfiniteQuery({
		queryKey: ['groupMessages', groupId, 'infinite'],
		initialPageParam: 1,
		queryFn: ({ pageParam }) =>
			getGroupMessages({ groupId, page: pageParam, limit }),
		getNextPageParam: (lastPage, allPages) =>
			lastPage.hasMore ? allPages.length + 1 : undefined,
	})
}
