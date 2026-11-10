import { useEffect } from 'react'

export function useIncomingCallSound(isRinging: boolean) {
	useEffect(() => {
		if (!isRinging || typeof Audio === 'undefined') return

		const audio = new Audio('/sounds/incomingCall.mp3')
		audio.loop = true
		audio.volume = 0.5
		void audio.play().catch(() => undefined)

		return () => {
			audio.pause()
			audio.currentTime = 0
		}
	}, [isRinging])
}
