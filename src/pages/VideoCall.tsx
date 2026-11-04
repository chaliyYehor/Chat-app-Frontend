import { useSelector } from 'react-redux'
import type { RootType } from '../store/store'
import clsx from 'clsx'
import CallBadge from '../components/main/chats-page/calls/CallBadge'
import { User } from 'lucide-react'
import Dial from '../components/main/chats-page/calls/Dial'

export default function VideoCall() {
	const appTheme = useSelector((state: RootType) => state.theme.mode)

	return (
		<div
			className={clsx(
				'w-screen h-dvh call flex flex-col justify-between items-center bg-[#F5F5F8]',
				appTheme === 'dark' && 'dark',
			)}
		>
			<div className='w-full overflow-hidden flex items-start justify-between pr-4 md:pr-0 md:px-10 pt-4 md:pt-10'>
				<div className='flex flex-col justify-between items-start px-5 pt-5'>
					<CallBadge text='Video Call' />
					<h2 className='dark:text-white mt-5 text-black font-bold font-inter text-2xl sm:text-3xl'>
						Sofia Chen
					</h2>
					<p className='text-[#6B6B80] mt-1 font-mono text-md'>08:13</p>
				</div>

				<div className='relative flex h-46 w-34 flex-col justify-center items-center dark:bg-[#16161B]/90 bg-[#FFFFFF]/90 rounded-xl border border-black/8 dark:border-white/6 shadow-2xl shadow-black/15 dark:shadow-black/50'>
					<div
						className={`w-20 h-20 rounded-[50%] dark:text-white flex justify-center items-center border-2 border-gray-700 relative shrink-0`.trim()}
					>
						<User size={30} />
					</div>
					<span className='absolute bottom-2 left-2 font-inter rounded-md px-1.5 py-0.5 dark:bg-black/40 text-[#F5F5F8] text-[11px] backdrop-blur-sm shadow-xl'>You</span>
				</div>
			</div>

			<div className='flex items-center gap-4 rounded-full border border-black/8 bg-white/90 px-3 py-3 shadow-2xl shadow-black/15 mb-5 dark:border-white/6 dark:bg-[#111115]/95 dark:shadow-black/50'>
				<Dial type='volume' />
				<Dial type='microphone' />
				<Dial type='endCall' />
				<Dial type='camera' />
			</div>
		</div>
	)
}
