import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../../Avatar'
import ChatRightClick from './ChatRightClick'
import MessagesIndicator from './MessagesIndicator'
import { getDisplayedStatus } from '../../../../lib/getDisplayedStatus'
import type z from 'zod'
import type { chatUserSchema } from '../../../../schemas/main/getChatsResponse'

export interface ChatMenuPosition {
	x: number
	y: number
}

interface ChatPreviewProps {
	menuPosition: ChatMenuPosition | null
	onOpenMenu: (position: ChatMenuPosition) => void
	onCloseMenu: () => void
	userInfo?: z.infer<typeof chatUserSchema>
	lastMessage?: {
		unreadMessages: number | undefined
		lastMessageSentAt: Date | undefined
		lastMessage: string | undefined
	}
	chatId: string
	isPinned: boolean
}

export default function ChatPreview({
	menuPosition,
	onOpenMenu,
	onCloseMenu,
	userInfo,
	chatId,
	isPinned,
	lastMessage,
}: ChatPreviewProps) {
	const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
	const longPressTriggered = useRef(false)

	const [isLoading, setIsLoading] = useState(false)

	function handleContextMenu(e: React.MouseEvent) {
		e.preventDefault()
		e.stopPropagation()
		onOpenMenu({ x: e.clientX, y: e.clientY })
	}

	function cancelLongPress() {
		if (longPressTimer.current) {
			clearTimeout(longPressTimer.current)
			longPressTimer.current = null
		}
	}

	function handlePointerDown(e: React.PointerEvent<HTMLAnchorElement>) {
		if (e.pointerType !== 'touch') return

		longPressTriggered.current = false
		longPressTimer.current = setTimeout(() => {
			e.preventDefault()
			longPressTriggered.current = true
			onOpenMenu({ x: e.clientX, y: e.clientY })
		}, 200)
	}

	function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
		if (longPressTriggered.current) {
			e.preventDefault()
			longPressTriggered.current = false
		}
	}

	if (!userInfo) {
		return null
	}

	const { name, imageUrl, status, previouslySetStatus } = userInfo
	const formatMessageDate = (date: Date) => {
		const now = new Date()
		const isToday =
			date.getFullYear() === now.getFullYear() &&
			date.getMonth() === now.getMonth() &&
			date.getDate() === now.getDate()

		if (isToday) {
			return date.toLocaleTimeString([], {
				hour: '2-digit',
				minute: '2-digit',
			})
		}

		return date.toLocaleDateString([], {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
		})
	}

	return (
		<Link
			to={`/chats/${chatId}`}
			onContextMenu={handleContextMenu}
			onPointerDown={handlePointerDown}
			onPointerUp={cancelLongPress}
			onPointerCancel={cancelLongPress}
			onPointerLeave={cancelLongPress}
			onClick={handleClick}
			className='chatPreview w-full h-17.5 flex justify-center items-center gap-3 dark:hover:bg-[#1e1e26] hover:bg-[#ebebf0] p-2 rounded-lg transition-all duration-200 ease-in-out'
		>
			{menuPosition && (
				<ChatRightClick
					setIsLoading={setIsLoading}
					isPinned={isPinned}
					chatId={chatId}
					position={menuPosition}
					onClose={onCloseMenu}
				/>
			)}
			{isLoading ? (
				<div className='w-full h-full flex justify-center items-center'>
					<div className='loader' />
				</div>
			) : (
				<>
					<Avatar
						state={getDisplayedStatus(status, previouslySetStatus)}
						imageUrl={imageUrl || undefined}
					/>
					<div className='flex-1 min-w-0 flex flex-col dark:text-white'>
						<p className='truncate max-w-[60%] font-semibold'>{name}</p>
						<p className='truncate max-w-[80%] text-sm'>
							{lastMessage?.lastMessage || ''}
						</p>
					</div>
					{lastMessage?.lastMessageSentAt && (
						<div className='info flex flex-col items-end gap-1'>
							<p className='text-[#6B6B80] text-[13px] font-mono'>
								{formatMessageDate(lastMessage.lastMessageSentAt)}
							</p>
							{(lastMessage.unreadMessages ?? 0) > 0 ? (
								<MessagesIndicator
									numberOfMessages={lastMessage.unreadMessages ?? 0}
								/>
							) : null}
						</div>
					)}
				</>
			)}
		</Link>
	)
}
