import {
	useQueryClient,
	type InfiniteData,
	type QueryKey,
} from '@tanstack/react-query'
import { useEffect, type Dispatch, type SetStateAction } from 'react'
import {
	groupMessageSchema,
	type GroupMessage,
} from '../../../schemas/main/getGroupMessagesResponse'
import { socket } from '../../../socket'
import { useNavigate } from 'react-router-dom'

interface Params {
	groupId: string
	messageQueryKey: QueryKey
	setMessages: Dispatch<SetStateAction<GroupMessage[]>>
	messageSoundsEnabled: boolean
	playMessageSound: () => void
}

export function useGroupSocketEvents({
	groupId,
	messageQueryKey,
	messageSoundsEnabled,
	playMessageSound,
	setMessages,
}: Params) {
	const queryClient = useQueryClient()
	const navigate = useNavigate()
	useEffect(() => {
		const handleMessageReceived = (data: { groupId: string }) => {
			if (data.groupId !== groupId) return
			void queryClient.invalidateQueries({
				queryKey: ['groups'],
			})
		}

		const handleNewGroupMessages = (data: unknown) => {
			if (!Array.isArray(data)) return

			const parsedMessages = data.flatMap(item => {
				const parsed = groupMessageSchema.safeParse(item)
				return parsed.success && parsed.data.groupId === groupId
					? [parsed.data]
					: []
			})
			if (parsedMessages.length === 0) return

			setMessages(current => {
				const existingIds = new Set(current.map(message => message.id))
				const newMessages = parsedMessages.filter(
					message => !existingIds.has(message.id),
				)
				return newMessages.length > 0
					? [...newMessages, ...current].sort(
							(first, second) =>
								second.createdAt.getTime() - first.createdAt.getTime(),
						)
					: current
			})

			queryClient.setQueryData<
				InfiniteData<{ messages: GroupMessage[]; hasMore: boolean }, number>
			>(messageQueryKey, current => {
				const firstPage = current?.pages[0]
				if (!current || !firstPage) return current

				const existingIds = new Set(
					current.pages.flatMap(page =>
						page.messages.map(message => message.id),
					),
				)
				const newMessages = parsedMessages.filter(
					message => !existingIds.has(message.id),
				)
				if (newMessages.length === 0) return current

				return {
					...current,
					pages: [
						{
							...firstPage,
							messages: [...newMessages, ...firstPage.messages].sort(
								(first, second) =>
									second.createdAt.getTime() - first.createdAt.getTime(),
							),
						},
						...current.pages.slice(1),
					],
				}
			})
		}

		const handleDeletedMessage = (data: {
			groupId: string
			messageId: string
		}) => {
			if (data.groupId !== groupId) return

			setMessages(current =>
				current.filter(message => message.id !== data.messageId),
			)

			queryClient.setQueryData<
				InfiniteData<{ messages: GroupMessage[]; hasMore: boolean }, number>
			>(
				messageQueryKey,
				current =>
					current && {
						...current,
						pages: current.pages.map(page => ({
							...page,
							messages: page.messages.filter(
								message => message.id !== data.messageId,
							),
						})),
					},
			)
		}

		const handleGroupChatCleared = (data: { groupId: string }) => {
			if (data.groupId !== groupId) return
			setMessages([])
			void queryClient.invalidateQueries({ queryKey: ['messages', groupId] })
			void queryClient.invalidateQueries({ queryKey: ['groups'] })
		}

		const handleGroupDescriptionUpdated = (data: {
			groupId: string
			description: string
		}) => {
			if (data.groupId !== groupId) return
			void queryClient.invalidateQueries({ queryKey: ['groups'] })
		}

		const handleGroupDeleted = (data: { groupId: string }) => {
			if (data.groupId === groupId) {
				queryClient.invalidateQueries({ queryKey: ['groups'] })
				navigate('/groups', { replace: true })
			}
		}

		const handleGroupLeft = (data: { groupId: string }) => {
			if (data.groupId === groupId) {
				queryClient.invalidateQueries({ queryKey: ['groups'] })
				navigate('/groups', { replace: true })
			}
		}

		const handleNotificationReceived = (data: { groupId: string }) => {
			if (data.groupId !== groupId) return
			if (messageSoundsEnabled) {
				playMessageSound()
			}
		}

		socket.on('group:deleted', handleGroupDeleted)
		socket.on('notification:new_group_message', handleNotificationReceived)
		socket.on('group:left', handleGroupLeft)
		socket.on('group:message:received', handleMessageReceived)
		socket.on('message:new_group_messages', handleNewGroupMessages)
		socket.on('message:deleted_group', handleDeletedMessage)
		socket.on('group:chat:cleared', handleGroupChatCleared)
		socket.on('group:description:updated', handleGroupDescriptionUpdated)
		return () => {
			socket.off('group:deleted', handleGroupDeleted)
			socket.off('group:message:received', handleMessageReceived)
			socket.off('notification:new_group_message', handleNotificationReceived)
			socket.off('message:new_group_messages', handleNewGroupMessages)
			socket.off('group:left', handleGroupLeft)
			socket.off('message:deleted_group', handleDeletedMessage)
			socket.off('group:description:updated', handleGroupDescriptionUpdated)
			socket.off('group:chat:cleared', handleGroupChatCleared)
		}
	}, [groupId, queryClient, messageQueryKey, setMessages, navigate, messageSoundsEnabled, playMessageSound])
}
