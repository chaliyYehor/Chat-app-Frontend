import { getSharedMediaSchema } from '../schemas/main/getSharedMedia'
import { api } from './axios'

export const getSharedMedia = async ({ chatId, otherUserId }: { chatId: string; otherUserId: string }) => {
	const response = await api.get('/api/user/getSharedMedia', {
		params: {
			chatId,
			otherUserId,
		},
	})

	return getSharedMediaSchema.parse(response.data)
}
