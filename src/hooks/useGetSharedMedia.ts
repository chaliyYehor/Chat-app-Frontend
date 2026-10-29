import { useQuery } from '@tanstack/react-query'
import { getSharedMedia } from '../api/getSharedMedia'

export const useGetSharedMedia = ({
	chatId,
	otherUserId,
	enabled,
}: {
	chatId: string
	otherUserId: string
	enabled: boolean
}) => {
	return useQuery({
		queryKey: ['sharedMedia', chatId, otherUserId],
		enabled: enabled && Boolean(chatId && otherUserId),
		queryFn: () => {
			if (!chatId || !otherUserId) {
				throw new Error('Chat ID and Other User ID are required')
			}

			return getSharedMedia({ chatId, otherUserId })
		},
	})
}
