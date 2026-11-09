import { previousCallsResponseSchema } from '../schemas/main/getPreviousCallsResponse'
import { api } from './axios'

export const getCalls = async () => {
	const response = await api.get('/api/calls/previous')

	return previousCallsResponseSchema.parse(response.data)
}