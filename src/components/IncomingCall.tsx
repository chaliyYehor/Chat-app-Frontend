import { Phone, PhoneOff } from 'lucide-react'
import { useEffect, useState } from 'react'
import Badge from './main/chats-page/Badge'
import { useSelector } from 'react-redux'
import type { RootType } from '../store/store'

export default function IncomingCall({
	type,
	callerName,
	timeoutMs,
	onAccept,
	onReject,
	onTimeout,
}: {
	type: 'video' | 'audio'
	callerName: string
	timeoutMs: number
	onAccept: () => void
	onReject: () => void
	onTimeout: () => void
}) {
	const [secondsLeft, setSecondsLeft] = useState(Math.ceil(timeoutMs / 1000))
	const appTheme = useSelector((state: RootType) => state.theme.mode)

	useEffect(() => {
		const intervalId = window.setInterval(() => {
			setSecondsLeft(seconds => Math.max(0, seconds - 1))
		}, 1000)
		const timeoutId = window.setTimeout(onTimeout, timeoutMs)
		return () => {
			window.clearInterval(intervalId)
			window.clearTimeout(timeoutId)
		}
	}, [onTimeout, timeoutMs])

	return (
		<div className='z-200 fixed w-screen h-dvh inset-0 bg-black/70 flex items-center justify-center backdrop-blur-xs'>
			<div className={`${appTheme === 'dark' ? 'bg-[#16161B] border-white/10' : 'bg-white border-black/10'} md:w-sm max-w-[90%] border shadow-2xl shadow-black/25 rounded-3xl w-full px-6 py-7 flex flex-col items-center gap-4`}>
				<Badge text={type === 'video' ? 'INCOMING VIDEO CALL' : 'INCOMING AUDIO CALL'} />
				<p className={`${appTheme === 'dark' ? 'text-white' : 'text-[#18181B]'} text-xl font-semibold`}>{callerName}</p>
				<p className={`${appTheme === 'dark' ? 'text-[#A1A1AA]' : 'text-[#6B6B80]'} text-sm`}>Answering in {secondsLeft}s</p>
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
