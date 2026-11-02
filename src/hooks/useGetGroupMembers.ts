import { useQuery } from '@tanstack/react-query'
import { getGroupMembers } from '../api/getGroupMembers'

export const useGetGroupMembers = (groupId: string) => {
	return useQuery({
		queryKey: ['groupMembers', groupId],
		queryFn: () => {
			if(!groupId) {
				throw new Error('Group ID is required')
			}

			return getGroupMembers({ groupId })
		}
	})
}