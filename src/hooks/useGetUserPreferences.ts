import { useQuery } from '@tanstack/react-query'
import { getUserPreferences } from '../api/getUserPreferences'

export const useGetUserPreferences = () => {
	return useQuery({
		queryKey: ['userPreferences'],
		queryFn: getUserPreferences,
	})
}
