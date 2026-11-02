import { useQuery } from '@tanstack/react-query'
import { getCreator } from '../api/getCreator'

export const useGetCreator = () => {
	return useQuery({
		queryKey: ['creator'],
		queryFn: getCreator
	})
}