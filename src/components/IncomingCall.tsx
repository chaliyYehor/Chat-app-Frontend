import { Phone, PhoneOff } from 'lucide-react'
import { useEffect, useState } from 'react'
import Badge from './main/chats-page/Badge'

export default function IncomingCall({
	type,
	callerName,
	timeoutMs,
	onAccept,
	onReject,
}: {
	type: 'video' | 'audio'
	callerName: string
	timeoutMs: number
	onAccept: () => void
	onReject: () => void
}) {
	const [secondsLeft, setSecondsLeft] = useState(Math.ceil(timeoutMs / 1000))

	useEffect(() => {
		const intervalId = window.setInterval(() => {
			setSecondsLeft(seconds => Math.max(0, seconds - 1))
		}, 1000)
		const timeoutId = window.setTimeout(onReject, timeoutMs)
		return () => {
			window.clearInterval(intervalId)
			window.clearTimeout(timeoutId)
		}
	}, [onReject, timeoutMs])

	return (
		<div className='z-200 fixed w-screen h-dvh inset-0 bg-black/70 flex items-center justify-center backdrop-blur-xs'>
			<div className='bg-[#16161B] md:w-sm max-w-[90%] border border-white/10 shadow-2xl shadow-black/25 rounded-3xl w-full px-6 py-7 flex flex-col items-center gap-4'>
				<Badge text={type === 'video' ? 'INCOMING VIDEO CALL' : 'INCOMING AUDIO CALL'} />
				<p className='text-white text-xl font-semibold'>{callerName}</p>
				<p className='text-[#A1A1AA] text-sm'>Answering in {secondsLeft}s</p>
				<div className='flex items-center gap-5 mt-2'>
					<button
						type='button'
						aria-label='Reject call'
						onClick={onReject}
						className='size-14 rounded-full bg-[#FB2C36] text-white flex items-center justify-center hover:bg-[#e9232d]'
					>
						<PhoneOff size={21} />
					</button>
					<button
						type='button'
						aria-label='Accept call'
						onClick={onAccept}
						className='size-14 rounded-full bg-[#00A884] text-white flex items-center justify-center hover:bg-[#008f70]'
					>
						<Phone size={21} />
					</button>
				</div>
			</div>
		</div>
	)
}
