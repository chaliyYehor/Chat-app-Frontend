import { useRef } from 'react'
import { Link } from 'react-router-dom'
import type { ChatMenuPosition } from '../chat/ChatPreview'
import ChatRightClick from '../chat/ChatRightClick'
import MessagesIndicator from '../chat/MessagesIndicator'
import GroupPfp from './GroupPfp'

interface GroupPreviewProps {
	menuPosition: ChatMenuPosition | null
	onOpenMenu: (position: ChatMenuPosition) => void
	onCloseMenu: () => void
}

export default function GroupPreview({
	menuPosition,
	onOpenMenu,
	onCloseMenu,
}: GroupPreviewProps) {
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
	return (
		<Link
			to={'/groups/123'}
			onContextMenu={handleContextMenu}
			onPointerDown={handlePointerDown}
			onPointerUp={cancelLongPress}
			onPointerCancel={cancelLongPress}
			onPointerLeave={cancelLongPress}
			onClick={handleClick}
			className='chatPreview w-full h-17.5 flex justify-center items-center gap-3 dark:hover:bg-[#1e1e26] hover:bg-[#f0f0f4] p-2 rounded-lg transition-all duration-200 ease-in-out mt-3'
		>
			{menuPosition && (
				<ChatRightClick
					position={menuPosition}
					onClose={onCloseMenu}
					isGroup={true}
				/>
			)}
			<GroupPfp />
			<div className='flex-1 min-w-0 flex flex-col dark:text-white'>
				<p className='truncate max-w-[60%] font-bold font-inter text-[16px]'>
					Design Team
				</p>
				<p className='truncate max-w-full text-sm text-[#6B6B80]'>4 members</p>
				<p className='truncate max-w-full text-sm text-[#6B6B80]'>
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi quam
					rerum debitis mollitia eius eaque adipisci reiciendis quos itaque
					tempore.
				</p>
			</div>
			<div className='info flex flex-col items-end  gap-1'>
				<MessagesIndicator />
			</div>
		</Link>
	)
}
