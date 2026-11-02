import { getSharedMediaSchema } from '../schemas/main/getSharedMedia'
import { api } from './axios'

export const getSharedMedia = async ({
	chatId,
	groupId,
	otherUserId,
}: {
	chatId?: string
	groupId?: string
	otherUserId: string
}) => {
	const response = await api.get('/api/user/getSharedMedia', {
		params: {
			...(chatId ? { chatId } : {}),
			...(groupId ? { groupId } : {}),
			otherUserId,
		},
	})

	return getSharedMediaSchema.parse(response.data)
}
