import { useEffect, useState } from 'react'

export function useIsMobile() {
	const [isMobile, setIsMobile] = useState(
		() => !window.matchMedia('(min-width: 768px)').matches,
	)

	useEffect(() => {
		const mediaQuery = window.matchMedia('(min-width: 768px)')

		const update = () => setIsMobile(!mediaQuery.matches)

		update()
		mediaQuery.addEventListener('change', update)

		return () => mediaQuery.removeEventListener('change', update)
	}, [])

	return isMobile
}
