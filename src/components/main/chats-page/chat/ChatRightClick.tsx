import { createPortal } from 'react-dom'
import { Pin, Trash2 } from 'lucide-react'
import { useEffect, useRef } from 'react'

interface ChatRightClickProps {
	position: { x: number; y: number }
	onClose: () => void
}

export default function ChatRightClick({
	position,
	onClose,
}: ChatRightClickProps) {
	const menuRef = useRef<HTMLDivElement>(null)

	const menuItems = [
		{ icon: Pin, label: 'Pin', onClick: () => onClose() },
		{ icon: Trash2, label: 'Delete', danger: true, onClick: () => onClose() },
	]

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
	return createPortal(
		<div
			ref={menuRef}
			style={{ top: `${top}px`, left: `${left}px` }}
			onContextMenu={e => {
				e.preventDefault()
				e.stopPropagation()
			}}
			className='fixed bg-[#16161B] w-48 rounded-2xl z-50 border border-white/20 shadow-2xl p-1.5 overflow-hidden flex flex-col gap-0.5 text-white select-none'
		>
			{menuItems.map((item, index) => {
				const Icon = item.icon
				return (
					<button
						className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-inter transition-colors cursor-pointer text-left w-full ${
							item.danger
								? 'text-red-400 hover:bg-red-500/10'
								: 'text-[#E0E0E6] hover:bg-white/10'
						}`}
						key={index}
						onClick={e => {
							e.stopPropagation()
							item.onClick()
						}}
					>
						<Icon size={16} className='shrink-0' />
						<span>{item.label}</span>
					</button>
				)
			})}
		</div>,
		document.body,
	)
}
