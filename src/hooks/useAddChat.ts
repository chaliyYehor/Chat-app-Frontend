import { useQuery } from '@tanstack/react-query'
import { addChat } from '../api/addChat'

export const useAddChat = (search: string) => {
	const query = search.trim()

	return useQuery({
		queryKey: ['people', query],
		queryFn: () => addChat(query),
		enabled: query.length > 0,
	})
}