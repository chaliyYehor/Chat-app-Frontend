import { useCallback, useEffect, useRef, useState } from 'react'
import Avatar from '../../Avatar'
import CallButon from './CallButton'
import Message from './Message'
import MoreInfoButton from './MoreInfoButton'
import SendAMessage from './SendAMessage'
import VideoCallBtn from './VideoCallBtn'
import UserInfo from '../../UserInfo'
import ImageMessage from './ImageMessage'
import { ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootType } from '../../../../store/store'
import { getDisplayedStatus } from '../../../../lib/getDisplayedStatus'
import { useGetUserInfoChat } from '../../../../hooks/useGetUserInfoChat'
import { useGetChatInfo } from '../../../../hooks/useGetChatInfo'
import clsx from 'clsx'
import { useGetMessages } from '../../../../hooks/useGetMessages'
import { authClient } from '../../../../lib/auth-client'
import type {
	Message as MessageData,
	Messages,
} from '../../../../schemas/main/messages'
import { socket } from '../../../../socket'
import { useQueryClient } from '@tanstack/react-query'
import ScrollDownBtn from '../../../ScrollDownBtn'
export function Chat() {
	const [isProfileOpened, setIsProfileOpened] = useState(false)

	const [hasScrolled, setHasScrolled] = useState(false)

	const chatref = useRef<HTMLDivElement>(null)
	const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
		setHasScrolled(e.currentTarget.scrollTop < -400)
	}, [])
	useEffect(() => {
		console.log('hasScrolled', hasScrolled)
	}, [hasScrolled])

	const [messagesState, setMessagesState] = useState<MessageData[]>([])
	const latestMessageRef = useRef<HTMLDivElement>(null)
	const [oldestMessageElement, setOldestMessageElement] =
		useState<HTMLDivElement | null>(null)
	const [newestMessageElement, setNewestMessageElement] =
		useState<HTMLDivElement | null>(null)

	const appTheme = useSelector((state: RootType) => state.theme.mode)

	const chatId = useParams().chatId
	const userId = authClient.useSession().data?.user?.id

	const { data: userInfo, isPending: isUserInfoPending } = useGetUserInfoChat(
		chatId as string,
	)
	const { data: chatInfo, isPending: isChatInfoPending } = useGetChatInfo(
		chatId as string,
	)

	const queryClient = useQueryClient()

	const { data: messages, isPending: isMessagesPending } = useGetMessages({
		conversationId: chatId as string,
		page: 1,
		limit: 20,
	})

	const setLatestMessageRefs = useCallback((node: HTMLDivElement | null) => {
		latestMessageRef.current = node
		setNewestMessageElement(node)
	}, [])

	const markAsRead = () => {
		socket.emit(
			'message:mark_as_read',
			{ chatId },
			({ success, error }: { success: boolean; error: string | null }) => {
				if (success) {
					queryClient.invalidateQueries({
						queryKey: ['chats'],
					})
					queryClient.invalidateQueries({
						queryKey: ['messages', chatId],
					})
				}
				if (error) {
					console.error('Error marking messages as read:', error)
				}
			},
		)
	}

	useEffect(() => {
		if (!newestMessageElement) return

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry?.isIntersecting) {
					markAsRead()
				}
			},
			{ threshold: 0.5 },
		)

		observer.observe(newestMessageElement)

		return () => observer.disconnect()
	}, [newestMessageElement])

	useEffect(() => {
		if (!oldestMessageElement) return

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry?.isIntersecting) {
					console.log('oldest message is visible')
				}
			},
			{ threshold: 0.5 },
		)

		observer.observe(oldestMessageElement)

		return () => observer.disconnect()
	}, [oldestMessageElement])

	useEffect(() => {
		if (messages && !isMessagesPending) {
			setMessagesState(messages.messages)
		}
	}, [messages, isMessagesPending])

	const scrollToLatestMessage = () => {
		latestMessageRef.current?.scrollIntoView({
			behavior: 'smooth',
			block: 'end',
		})
	}

	useEffect(() => {
		if (!isMessagesPending && messagesState.length > 0 && !hasScrolled) {
			scrollToLatestMessage()
		}

		console.log(latestMessageRef.current)
	}, [messagesState, isMessagesPending])

	useEffect(() => {
		const handleNewMessages = (data: Messages['messages']) => {
			const chatMessages = data
				.filter(message => message.conversationId === chatId)
				.map(message => ({
					...message,
					createdAt: new Date(message.createdAt),
				}))

			setMessagesState(currentMessages => {
				const newMessages = chatMessages.filter(
					message =>
						!currentMessages.some(current => current.id === message.id),
				)

				if (newMessages.length > 0) {
					console.log(newMessages)
				}

				return newMessages.length > 0
					? [...newMessages, ...currentMessages]
					: currentMessages
			})
		}

		queryClient.invalidateQueries({
			queryKey: ['chats'],
		})
		queryClient.invalidateQueries({
			queryKey: ['userInfoChat', chatId],
		})

		const handleMessageReceived = () => {
			queryClient.invalidateQueries({
				queryKey: ['chats'],
			})
			queryClient.invalidateQueries({
				queryKey: ['userInfoChat', chatId],
			})
		}

		const handleMessagesRead = ({
			conversationId,
		}: {
			conversationId: string
		}) => {
			queryClient.invalidateQueries({
				queryKey: ['messages', conversationId],
			})
		}

		socket.on('message:read', handleMessagesRead)
		socket.on('message:new_messages', handleNewMessages)
		socket.on('message:received', handleMessageReceived)

		return () => {
			socket.off('message:read', handleMessagesRead)
			socket.off('message:new_messages', handleNewMessages)
			socket.off('message:received', handleMessageReceived)
		}
	}, [chatId])

	useEffect(() => {
		const handleDeletedMessage = (data: {
			conversationId: string
			messageId: string
		}) => {
			if (data.conversationId !== chatId) return

			setMessagesState(currentMessages =>
				currentMessages.filter(message => message.id !== data.messageId),
			)
		}

		socket.on('message:deleted', handleDeletedMessage)

		return () => {
			socket.off('message:deleted', handleDeletedMessage)
		}
	}, [chatId])

	return (
		<div className='w-full h-full overflow-hidden flex flex-col dark:bg-[#16161b] bg-white border-l border-gray-700/60'>
			<div className='p-4 shrink-0 flex w-full justify-between items-center border-b border-gray-700/60'>
				<div className='flex justify-center items-center gap-3'>
					{isProfileOpened && (
						<UserInfo
							sharedMedia={true}
							isYourProfile={false}
							userInfo={userInfo}
							isFetching={isUserInfoPending}
							setIsProfileOpened={setIsProfileOpened}
						/>
					)}
					<Link
						to='/chats'
						className={`cursor-pointer transition-all duration-200 ease-in-out rounded-full ${appTheme === 'dark' ? 'hover:bg-[#2D2D3B]' : 'hover:bg-[#E5E5EA]'}`}
					>
						<ArrowLeft color='#6B6B80' />
					</Link>
					<button
						onClick={() => setIsProfileOpened(true)}
						type='button'
						className='cursor-pointer hover:outline-2 hover:outline-[#7C5CFC] transition-all duration-200 ease-in-out rounded-full'
						aria-label='Open profile'
					>
						<Avatar
							imageUrl={userInfo?.imageUrl || undefined}
							isLoading={isUserInfoPending}
							state={getDisplayedStatus(
								userInfo?.status,
								userInfo?.previouslySetStatus,
							)}
						/>
					</button>
					<div className='w-[70%] flex flex-col gap-1'>
						<p
							className={clsx(
								isUserInfoPending ? 'skeleton-shimmer' : '',
								'font-semibold font-inter text-md truncate dark:text-white h-6 flex min-w-30 rounded-md',
							)}
						>
							{userInfo?.name || ''}
						</p>
						<p
							className={clsx(
								isUserInfoPending ? 'skeleton-shimmer' : '',
								'text-[#6B6B80] text-[13px] font-inter text-xs h-4 min-w-10 rounded-md capitalize',
							)}
						>
							{!isUserInfoPending &&
								getDisplayedStatus(
									userInfo?.status,
									userInfo?.previouslySetStatus,
								)}
						</p>
					</div>
				</div>
				<div className='h-full flex justify-center items-center gap-2'>
					{isChatInfoPending ? (
						<div className='w-full h-full flex justify-center items-center'>
							<div className='loader' />
						</div>
					) : (
						<>
							<CallButon />
							<VideoCallBtn />
							<MoreInfoButton
								isPinned={chatInfo?.conversationUserData.isPinned!}
								chatId={chatId as string}
							/>
						</>
					)}
				</div>
			</div>

			<div
				ref={chatref}
				onScroll={handleScroll}
				className='messages relative w-full min-h-0 flex-1 flex flex-col-reverse text-white p-5 gap-2'
			>
				{
					<ScrollDownBtn
						isVisible={hasScrolled}
						onClick={scrollToLatestMessage}
					/>
				}
				{isMessagesPending || isUserInfoPending ? (
					<div className='w-full h-full flex justify-center items-center'>
						<div className='loader' />
					</div>
				) : !userInfo ? (
					<div className='w-full h-full flex justify-center items-center'>
						<p>Failed to load user information</p>
					</div>
				) : (
					messagesState.map((message, index) => (
						<div
							key={message.id}
							ref={
								index === 0
									? setLatestMessageRefs
									: index === messagesState.length - 1
										? setOldestMessageElement
										: null
							}
						>
							{message.type === 'image' ? (
								<ImageMessage
									isFetching={isUserInfoPending}
									imageUrl={userInfo?.imageUrl ?? undefined}
									messageInfo={message}
									userInfo={userInfo}
									isMe={message.senderId === userId}
									chatId={chatId as string}
								/>
							) : (
								<Message
									imageUrl={userInfo?.imageUrl ?? undefined}
									messageInfo={message}
									isFetching={isUserInfoPending}
									userInfo={userInfo}
									isMe={message.senderId === userId}
									chatId={chatId as string}
								/>
							)}
						</div>
					))
				)}
			</div>

			<SendAMessage
				lastMessageAt={messagesState[0]?.createdAt}
				setMessages={setMessagesState}
				chatId={chatId as string}
			/>
		</div>
	)
}
