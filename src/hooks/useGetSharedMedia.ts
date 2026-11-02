import { useQuery } from '@tanstack/react-query'
import { getSharedMedia } from '../api/getSharedMedia'

export const useGetSharedMedia = ({
	chatId,
	groupId,
	otherUserId,
	enabled,
}: {
	chatId: string
	groupId: string
	otherUserId: string
	enabled: boolean
}) => {
	return useQuery({
		queryKey: ['sharedMedia', chatId || groupId, otherUserId],
		enabled: enabled && Boolean((chatId || groupId) && otherUserId),
		queryFn: () => {
			if ((!chatId && !groupId) || !otherUserId) {
				throw new Error('Conversation or group ID and other user ID are required')
			}

			return getSharedMedia({ chatId: chatId || undefined, groupId: groupId || undefined, otherUserId })
		},
	})
}
