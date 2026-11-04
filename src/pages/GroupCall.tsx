import CallBadge from '../components/main/chats-page/calls/CallBadge'
import { User } from 'lucide-react'
import Badge from '../components/main/chats-page/Badge'
import Dial from '../components/main/chats-page/calls/Dial'
import GroupCallParticipant from '../components/main/chats-page/groups/GroupCallParticipant'

export default function GroupCall() {
	return (
		<div className='w-screen h-dvh dark:bg-black bg-white flex flex-col gap-4 px-5 py-5 items-center justify-between'>
			<div className='w-full flex justify-between items-center gap-2'>
				<div className=''>
					<span className='font-mono text-[12px] text-[#6B6B80] uppercase select-none'>
						GROUP AUDIO CALL
					</span>
					<div className='flex items-center w-fit gap-2 sm:gap-3'>
						<h2 className='dark:text-white mt-1 self-end text-black font-bold font-inter text-lg sm:text-2xl md:text-3xl whitespace-nowrap'>
							Design Team
						</h2>
						<div className='size-2 rounded-full self-end my-auto bg-[#00D4AA]' />
						<p className='text-[#6B6B80] mt-1 font-mono text-sm sm:text-lg whitespace-nowrap'>08:13</p>
					</div>
				</div>
				<CallBadge text='4 participants' />
			</div>

			<div className='w-full flex flex-1 min-h-0 flex-col md:flex-row gap-4'>
				<div className='w-full md:flex-1 min-h-0'>
					<div className='bg-[#7C5CFC]/5 border-[#000000]/8 h-full w-full min-h-0 flex-1 flex flex-col justify-between items-center overflow-hidden shadow-2xl shadow-[#000000]/25 border dark:border-[#FFFFFF]/7 rounded-3xl p-3 sm:p-5'>
						<div className='font-mono w-fit rounded-full dark:text-white border border-[#000000]/8 dark:border-white/7 dark:bg-[#16161B] p-2 text-[12px] py-1 bg-[#FFFFFF] letter-spacing-[0.5px] shadow-md flex justify-center items-center gap-2 self-start'>
							<div className='size-2 rounded-full self-end my-auto bg-[#00D4AA]' />
							<span className='uppercase select-none text-shadow-2xs'>
								IN FOCUS
							</span>
						</div>

						<div className='flex flex-col gap-2 sm:gap-3 justify-center items-center'>
							<div
								className={`w-20 h-20 sm:w-30 sm:h-30 rounded-[50%] dark:text-white flex justify-center items-center border-2 border-gray-700 relative shrink-0`.trim()}
							>
								<User size={40} />
							</div>
							<Badge noMargin text='SPEAKING' />
						</div>

						<div className='self-start'>
							<h2 className='dark:text-white mt-2 sm:mt-5 text-black font-bold font-inter text-xl sm:text-2xl md:text-3xl'>
								Sofia Chen
							</h2>
							<p className='text-[#6B6B80] mt-1 font-mono text-sm sm:text-md'>
								Active speaker
							</p>
						</div>
					</div>
				</div>
				<div className='w-full h-[46%] md:w-[30%] md:h-full min-h-0 shrink-0'>
					<div className='dark:bg-[#101014] bg-[#FFFFFF] h-full w-full min-h-0 flex flex-col gap-3 sm:gap-5 items-center overflow-hidden shadow-2xl shadow-[#000000]/25 border border-[#FFFFFF]/7 rounded-3xl p-3 sm:p-5'>
						<p className='dark:text-white self-start text-black font-bold font-inter text-lg sm:text-xl'>
							All participants
						</p>
						<ul className='w-full flex-1 min-h-0 flex flex-col gap-2 overflow-y-auto scrollbar-none rounded-md'>
							<GroupCallParticipant isInFocus={true} isListening={true} />
							<GroupCallParticipant isInFocus={false} isListening={true} />
							<GroupCallParticipant isInFocus={false} isListening={true} />
							<GroupCallParticipant isInFocus={false} isListening={true} />
							<GroupCallParticipant isInFocus={false} isListening={true} />
							<GroupCallParticipant isInFocus={false} isListening={true} />
							<GroupCallParticipant isInFocus={false} isListening={true} />
							<GroupCallParticipant isInFocus={false} isListening={true} />
						</ul>
					</div>
				</div>
			</div>
			<div className='flex items-center gap-4 rounded-full border border-black/8 bg-white/90 px-3 py-3 shadow-2xl shadow-black/15 mb-5 dark:border-white/6 dark:bg-[#111115]/95 dark:shadow-black/50'>
				<Dial type='volume' />
				<Dial type='endCall' />
				<Dial type='microphone' />
			</div>
		</div>
	)
}
