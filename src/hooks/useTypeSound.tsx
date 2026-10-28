import { useCallback, useRef } from 'react'

interface TypeSoundOptions {
	volume?: number
	minInterval?: number
	poolSize?: number
}

export function useTypeSound(
	src = '/sounds/typingSound.mp3',
	{ volume = 0.03, minInterval = 0, poolSize = 8 }: TypeSoundOptions = {},
) {
	const pool = useRef<HTMLAudioElement[]>([])
	const index = useRef(0)
	const lastPlayed = useRef(0)

	return useCallback(() => {
		const now = Date.now()
		if (now - lastPlayed.current < minInterval) return
		lastPlayed.current = now

		if (typeof Audio === 'undefined') return
		if (pool.current.length === 0) {
			pool.current = Array.from({ length: Math.max(1, poolSize) }, () => {
				const audio = new Audio(src)
				audio.volume = volume
				audio.preload = 'auto'
				return audio
			})
		}

		const audio = pool.current[index.current]
		if (!audio) return

		index.current = (index.current + 1) % pool.current.length
		audio.currentTime = 0
		void audio.play().catch(error => {
			console.error('Failed to play typing sound:', error)
		})
	}, [minInterval, poolSize, src, volume])
}
