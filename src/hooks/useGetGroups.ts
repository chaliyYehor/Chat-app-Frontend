import { useQuery } from '@tanstack/react-query'
import { getGroups } from '../api/getGroups'

export const useGetGroups = () => {
	return useQuery({
		queryKey: ['groups'],
		queryFn: getGroups
	})
}