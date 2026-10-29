import { useEffect, useMemo, useState } from 'react'
import {
	FormProvider,
	useForm,
	useFormContext,
	type SubmitHandler,
} from 'react-hook-form'
import type { ChatSearch as ChatSearchType } from '../../../schemas/main/chatSearch'
import AddChat from './AddChat'
import AddChatBtn from './AddChatBtn'
import { ChatSearch } from './ChatSearch'
import NoConvosYet from './NoConvosYet'
import ChatPreview, { type ChatMenuPosition } from './chat/ChatPreview'
import { addChatSchema, type AddChatType } from '../../../schemas/main/addChat'
import { zodResolver } from '@hookform/resolvers/zod/dist/zod.js'
import { useGetChats } from '../../../hooks/useGetChats'
import type z from 'zod'
import type { chatUserSchema } from '../../../schemas/main/getChatsResponse'
import { authClient } from '../../../lib/auth-client'
import type { AppDispatch } from '../../../store/store'
import { useDispatch } from 'react-redux'
import { setPopUpError } from '../../../store/slices/popUpSlice'

export default function ChatList() {
	const [isAdding, setIsAdding] = useState(false)
	const [activeChatMenu, setActiveChatMenu] = useState<{
		id: string
		position: ChatMenuPosition
	} | null>(null)

	const { control, handleSubmit } = useFormContext<ChatSearchType>()

	const { data: chatsData, isError: isChatsError, isPending } = useGetChats()
	const userId = authClient.useSession().data?.user.id

	const dispatch = useDispatch<AppDispatch>()

	useEffect(() => {
		if (isChatsError) {
			dispatch(
				setPopUpError({
					heading: 'Error',
					text: 'Failed to load chats. Please try again.',
				}),
			)
		}
	}, [isChatsError])
	const chatsRes = useMemo(() => {
		if (!chatsData || !userId) return []

		return chatsData
			.map(chat => ({
				...chat,
				otherUser:
					chat.conversation.userOneId === userId ? chat.userTwo : chat.userOne,
			}))
			.filter(chat => chat.otherUser !== null)
	}, [chatsData, userId])

	const onSubmit: SubmitHandler<ChatSearchType> = data => {
		console.log(data)
	}

	function renderChatPreview(
		id: string,
		isPinned: boolean,
		userInfo?: z.infer<typeof chatUserSchema>,
		lastMessage?: {
			unreadMessages: number | undefined
			lastMessageSentAt: Date | undefined
			lastMessage: string | undefined
		},
	) {
		return (
			<ChatPreview
				key={id}
				isPinned={isPinned}
				chatId={id}
				userInfo={userInfo}
				lastMessage={lastMessage}
				menuPosition={
					activeChatMenu?.id === id ? activeChatMenu.position : null
				}
				onOpenMenu={position => setActiveChatMenu({ id, position })}
				onCloseMenu={() => setActiveChatMenu(null)}
			/>
		)
	}

	const addChatMethods = useForm<AddChatType>({
		resolver: zodResolver(addChatSchema),
		defaultValues: {
			search: '',
		},
		mode: 'onSubmit',
	})

	const pinnedChats = chatsRes.filter(chat => chat.conversationUser.isPinned)
	const chats = chatsRes.filter(chat => !chat.conversationUser.isPinned)

	return (
		<div className='chatListContainer h-full w-full min-w-0 dark:bg-[#16161b] bg-white pb-15'>
			<div className=' mb-10 flex flex-col gap-4 mt-5'>
				<div className='flex items-center justify-between px-4 py-2'>
					<h2 className='dark:text-white text-3xl font-bold '>Messages</h2>
					<AddChatBtn onClick={setIsAdding} />
				</div>
				<form onSubmit={handleSubmit(onSubmit)}>
					<ChatSearch control={control} name='search' isChatSearch={false} />
				</form>
			</div>

			{isPending ? (
				<div
					className='loader mx-auto'
					role='status'
					aria-label='Loading chats'
				/>
			) : chatsRes.length === 0 ? (
				<NoConvosYet onClick={setIsAdding} />
			) : (
				<>
					{pinnedChats.length !== 0 && (
						<section className='px-4 font-semibold text-sm mb-5'>
							<h3 className='text-[#6B6B80] font-inter mb-3'>PINNED</h3>
							<div className='flex flex-col gap-4'>
								{pinnedChats
									.filter(chat => chat.conversationUser.isPinned)
									.map(chat =>
										renderChatPreview(
											chat.conversation.id,
											chat.conversationUser.isPinned,
											chat.otherUser ?? undefined,
											{
												lastMessage: chat.conversation.lastMessage ?? undefined,
												lastMessageSentAt:
													chat.conversation.lastMessageAt ?? undefined,
												unreadMessages:
													chat.conversationUser.unreadMessagesCount,
											},
										),
									)}
							</div>
							<hr className='text-gray-500/50 mt-3' />
						</section>
					)}
					{chats.length !== 0 && <section className='px-4 font-semibold text-sm'>
						<h3 className='text-[#6B6B80] font-inter mb-3'>ALL MESSAGES</h3>
						<div className='flex flex-col gap-4'>
							{chats
								.filter(chat => !chat.conversationUser.isPinned)
								.map(chat =>
									renderChatPreview(
										chat.conversation.id,
										chat.conversationUser.isPinned,
										chat.otherUser ?? undefined,
										{
											lastMessage: chat.conversation.lastMessage ?? undefined,
											lastMessageSentAt:
												chat.conversation.lastMessageAt ?? undefined,
											unreadMessages: chat.conversationUser.unreadMessagesCount,
										},
									),
								)}
						</div>
					</section>}
				</>
			)}
			<FormProvider {...addChatMethods}>
				{isAdding && <AddChat setIsAdding={setIsAdding} />}
			</FormProvider>
		</div>
	)
}
