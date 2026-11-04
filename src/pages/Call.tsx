import { useSelector } from 'react-redux'
import type { RootType } from '../store/store'
import clsx from 'clsx'
import CallBadge from '../components/main/chats-page/calls/CallBadge'
import { User } from 'lucide-react'
import Dial from '../components/main/chats-page/calls/Dial'

export default function Call() {
	const appTheme = useSelector((state: RootType) => state.theme.mode)

	return (
		<div
			className={clsx(
				'w-screen h-dvh call flex flex-col justify-between items-center bg-[#F5F5F8]',
				appTheme === 'dark' && 'dark',
			)}
		>
			<div className='w-full flex justify-between items-center px-5 pt-5'>
				<CallBadge text='Audio Call' />
				<span className='font-mono text-[12px] text-[#6B6B80] uppercase select-none'>
					encrypted
				</span>
			</div>

			<div className='flex flex-col justify-center items-center'>
				<div
					className={`w-30 h-30 rounded-[50%] dark:text-white flex justify-center items-center border-2 border-gray-700 relative shrink-0`.trim()}
				>
					<User size={40} />
				</div>
				<h2 className='dark:text-white mt-5 text-black font-bold font-inter text-2xl sm:text-3xl'>
					Sofia Chen
				</h2>
				<p className='text-[#6B6B80] mt-1 font-mono text-md'>08:13</p>
			</div>

			<div className='flex items-center gap-4 rounded-full border border-black/8 bg-white/90 px-3 py-3 shadow-2xl shadow-black/15 mb-5 dark:border-white/6 dark:bg-[#111115]/95 dark:shadow-black/50'>
				<Dial type='volume' />
				<Dial type='endCall' />
				<Dial type='microphone' />
			</div>
		</div>
	)
}
