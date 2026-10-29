import { useEffect, type RefObject } from 'react'

export function useAccessibleMenu(menuRef: RefObject<HTMLDivElement | null>) {
	useEffect(() => {
		const menu = menuRef.current
		if (!menu) return

		const previouslyFocused = document.activeElement as HTMLElement | null
		const getMenuItems = () =>
			Array.from(
				menu.querySelectorAll<HTMLElement>(
					'[role="menuitem"]:not(:disabled)',
				),
			)

		getMenuItems()[0]?.focus()

		const handleKeyDown = (event: KeyboardEvent) => {
			if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return

			const items = getMenuItems()
			if (items.length === 0) return

			event.preventDefault()
			const currentIndex = items.indexOf(document.activeElement as HTMLElement)
			let nextIndex = currentIndex

			if (event.key === 'Home') nextIndex = 0
			else if (event.key === 'End') nextIndex = items.length - 1
			else if (currentIndex < 0) {
				nextIndex = event.key === 'ArrowUp' ? items.length - 1 : 0
			}
			else if (event.key === 'ArrowDown') {
				nextIndex = (currentIndex + 1 + items.length) % items.length
			} else {
				nextIndex = (currentIndex - 1 + items.length) % items.length
			}

			items[nextIndex]?.focus()
		}

		menu.addEventListener('keydown', handleKeyDown)
		return () => {
			menu.removeEventListener('keydown', handleKeyDown)
			if (previouslyFocused?.isConnected) previouslyFocused.focus()
		}
	}, [menuRef])
}
