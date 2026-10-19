import { useRef } from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../../Avatar'
import ChatRightClick from './ChatRightClick'
import MessagesIndicator from './MessagesIndicator'
import { useGetUserInfo } from '../../../../hooks/useGetUserInfo'
import { getDisplayedStatus } from '../../../../lib/getDisplayedStatus'

export interface ChatMenuPosition {
	x: number
	y: number
}

interface ChatPreviewProps {
	menuPosition: ChatMenuPosition | null
	onOpenMenu: (position: ChatMenuPosition) => void
	onCloseMenu: () => void
}

export default function ChatPreview({
	menuPosition,
	onOpenMenu,
	onCloseMenu,
}: ChatPreviewProps) {
	const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
	const longPressTriggered = useRef(false)

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

	const { data: userInfo } = useGetUserInfo()

	return (
		<Link
			to={'/chats/123'}
			onContextMenu={handleContextMenu}
			onPointerDown={handlePointerDown}
			onPointerUp={cancelLongPress}
			onPointerCancel={cancelLongPress}
			onPointerLeave={cancelLongPress}
			onClick={handleClick}
			className='chatPreview w-full h-17.5 flex justify-center items-center gap-3 dark:hover:bg-[#1e1e26] hover:bg-[#ebebf0] p-2 rounded-lg transition-all duration-200 ease-in-out'
		>
			{menuPosition && (
				<ChatRightClick position={menuPosition} onClose={onCloseMenu} />
			)}
			<Avatar
				state={getDisplayedStatus(
					userInfo?.status,
					userInfo?.previouslySetStatus,
				)}
			/>
			<div className='flex-1 min-w-0 flex flex-col dark:text-white'>
				<p className='truncate max-w-[60%] font-semibold'>Sofia Chen</p>
				<p className='truncate max-w-[80%] text-sm'>
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi quam
					rerum debitis mollitia eius eaque adipisci reiciendis quos itaque
					tempore.
				</p>
			</div>
			<div className='info flex flex-col items-end gap-1'>
				<p className='text-[#6B6B80] text-[13px] font-mono'>When</p>
				<MessagesIndicator />
			</div>
		</Link>
	)
}
