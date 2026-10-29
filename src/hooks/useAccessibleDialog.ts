import { useEffect, useRef } from 'react'

const FOCUSABLE_SELECTOR =
	'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function useAccessibleDialog(onClose: () => void) {
	const dialogRef = useRef<HTMLDivElement>(null)
	const onCloseRef = useRef(onClose)

	useEffect(() => {
		onCloseRef.current = onClose
	}, [onClose])

	useEffect(() => {
		const dialog = dialogRef.current
		if (!dialog) return

		const previouslyFocused = document.activeElement as HTMLElement | null
		const getFocusableElements = () =>
			Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
				element => element.offsetWidth > 0 || element.offsetHeight > 0,
			)

		;(getFocusableElements()[0] ?? dialog).focus()

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				if (!dialog.contains(document.activeElement)) return
				event.preventDefault()
				event.stopPropagation()
				onCloseRef.current()
				return
			}

			if (event.key !== 'Tab') return
			const focusableElements = getFocusableElements()
			if (focusableElements.length === 0) {
				event.preventDefault()
				dialog.focus()
				return
			}

			const first = focusableElements[0]
			const last = focusableElements[focusableElements.length - 1]
			if (event.shiftKey && document.activeElement === first) {
				event.preventDefault()
				last?.focus()
			} else if (!event.shiftKey && document.activeElement === last) {
				event.preventDefault()
				first?.focus()
			}
		}

		document.addEventListener('keydown', handleKeyDown)
		return () => {
			document.removeEventListener('keydown', handleKeyDown)
			if (previouslyFocused?.isConnected) previouslyFocused.focus()
		}
	}, [])

	return dialogRef
}
