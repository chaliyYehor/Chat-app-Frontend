import { useQuery } from '@tanstack/react-query'
import { getCalls } from '../api/getCalls'

export const useGetPreviousCalls = (enabled = true) => {
	return useQuery({
		queryKey: ['previousCalls'],
		queryFn: getCalls,
		enabled,
		staleTime: 30_000,
	})
}
