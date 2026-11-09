import { useQuery } from '@tanstack/react-query'
import { getCalls } from '../api/getCalls'

export const useGetPreviousCalls = () => {
	return useQuery({
		queryKey: ['previousCalls'],
		queryFn: getCalls,
	})
}
