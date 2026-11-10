import { useQuery } from '@tanstack/react-query'
import { getGroups } from '../api/getGroups'

export const useGetGroups = (enabled = true) => {
	return useQuery({
		queryKey: ['groups'],
		queryFn: getGroups,
		enabled,
		staleTime: 30_000,
	})
}
