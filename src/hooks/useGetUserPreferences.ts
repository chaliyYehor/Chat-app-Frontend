import { useQuery } from '@tanstack/react-query'
import { getUserPreferences } from '../api/getUserPreferences'

export const useGetUserPreferences = (enabled = true) => {
	return useQuery({
		queryKey: ['userPreferences'],
		queryFn: getUserPreferences,
		enabled,
		staleTime: 30_000,
	})
}
