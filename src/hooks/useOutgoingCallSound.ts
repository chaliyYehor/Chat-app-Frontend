import { useEffect } from 'react'

export function useOutgoingCallSound(isRinging: boolean) {
	useEffect(() => {
		if (!isRinging || typeof Audio === 'undefined') return

		const audio = new Audio('/sounds/outgoingCall.mp3')
		audio.loop = true
		audio.volume = 0.5
		void audio.play().catch(() => undefined)

		return () => {
			audio.pause()
			audio.currentTime = 0
		}
	}, [isRinging])
}
