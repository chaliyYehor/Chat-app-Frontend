import { Copy, Trash2, type LucideIcon } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import type { AppDispatch, RootType } from '../../../../store/store'
import { useDispatch, useSelector } from 'react-redux'
import { socket } from '../../../../socket'
import { setPopUpError } from '../../../../store/slices/popUpSlice'

interface RightClickProps {
	position: { x: number; y: number }
	chatId: string
	messageId: string
	messageText: string | null
	isMe: boolean
	onClose: () => void
}

interface MenuItem {
	icon: LucideIcon
	label: string
	onClick: () => void
	danger?: boolean
}

export default function RightClick({
	position,
	onClose,
	messageId,
	chatId,
	messageText,
	isMe,
}: RightClickProps) {
	const menuRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
				onClose()
			}
		}

		function handleKeyDown(e: KeyboardEvent) {
			if (e.key === 'Escape') {
				onClose()
			}
		}

		function handleScroll() {
			onClose()
		}

		const timer = setTimeout(() => {
			window.addEventListener('mousedown', handleClickOutside)
			window.addEventListener('contextmenu', handleClickOutside)
			window.addEventListener('keydown', handleKeyDown)
			window.addEventListener('scroll', handleScroll, true)
		}, 0)

		return () => {
			clearTimeout(timer)
			window.removeEventListener('mousedown', handleClickOutside)
			window.removeEventListener('contextmenu', handleClickOutside)
			window.removeEventListener('keydown', handleKeyDown)
			window.removeEventListener('scroll', handleScroll, true)
		}
	}, [onClose])

	const menuWidth = 192
	const menuHeight = 210

	let left = position.x
	let top = position.y

	if (typeof window !== 'undefined') {
		if (left + menuWidth > window.innerWidth) {
			left = Math.max(10, window.innerWidth - menuWidth - 10)
		}
		if (top + menuHeight > window.innerHeight) {
			top = Math.max(10, window.innerHeight - menuHeight - 10)
		}
	}

	const dispatch = useDispatch<AppDispatch>()

	const deleteMessage = () => {
		socket.emit(
			'message:delete',
			{ chatId, messageId },
			({ success, error }: { success: boolean; error: string }) => {
				if (!success) {
					console.error('Failed to delete message:', error)
					dispatch(
						setPopUpError({
							heading: 'Error',
							text: 'Failed to delete message. Please try again.',
						}),
					)
					return
				}
			},
		)
	}

	const copyMessage = () => {
		navigator.clipboard.writeText(messageText || '')
	}

	const menuItemsGeneral: MenuItem[] = [
		{
			icon: Copy,
			label: 'Copy text',
			onClick: () => {
				copyMessage()
				onClose()
			},
		},
		{
			icon: Trash2,
			label: 'Delete',
			danger: true,
			onClick: () => {
				deleteMessage()
				onClose()
			},
		},
	]

	const imageMenuItems: MenuItem[] = [
		{
			icon: Trash2,
			label: 'Delete',
			danger: true,
			onClick: () => {
				deleteMessage()
				onClose()
			},
		},
	]

	const notMeMenuItems: MenuItem[] = [
		{
			icon: Copy,
			label: 'Copy text',
			onClick: () => {
				copyMessage()
				onClose()
			},
		},
	]

	const menuItems = messageText && isMe ? menuItemsGeneral : !messageText && isMe ? imageMenuItems : notMeMenuItems

	const appTheme = useSelector((state: RootType) => state.theme.mode)

	return createPortal(
		<div
			ref={menuRef}
			role='menu'
			aria-label='Message actions'
			style={{ top: `${top}px`, left: `${left}px` }}
			onContextMenu={e => {
				e.preventDefault()
				e.stopPropagation()
			}}
			className='fixed dark:bg-[#16161B] bg-white w-48 rounded-2xl z-50 border border-white/20 shadow-2xl p-1.5 overflow-hidden flex flex-col gap-0.5 dark:text-white select-none'
		>
			{menuItems.map((item, index) => {
				const Icon = item.icon
				return (
					<button
						type='button'
						role='menuitem'
						key={index}
						onClick={e => {
							e.stopPropagation()
							item.onClick()
						}}
						className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-inter transition-colors cursor-pointer text-left w-full ${
							item.danger
								? 'text-red-400 hover:bg-red-500/10'
								: appTheme === 'dark'
									? 'text-[#E0E0E6] hover:bg-white/10'
									: 'text-[#6B6B80] hover:bg-[#ebebf0]/40'
						}`}
					>
						<Icon size={16} className='shrink-0' aria-hidden='true' />
						<span>{item.label}</span>
					</button>
				)
			})}
		</div>,
		document.body,
	)
}
