import { Mic, MicOff } from 'lucide-react'
import Avatar from '../../Avatar'
import { getDisplayedStatus } from '../../../../lib/getDisplayedStatus'

export default function GroupCallParticipant({
	isInFocus,
	userInfo,
	isMicOn,
}: {
	isInFocus: boolean
	userInfo: any
	isMicOn: boolean
}) {
	return (
		<li
			className={`${isInFocus ? 'dark:bg-[#7C5CFC]/4 bg-[#7C5CFC]/12' : 'dark:bg-[#1A1A22] bg-[#F0F0F4]'} flex gap-2 w-full shrink-0 min-h-15 dark:shadow-2xl shadow-[#000000]/25 border border-[#FFFFFF]/7 rounded-3xl p-3 sm:p-5 justify-beetween items-center`}
		>
			<div className='w-full flex items-center gap-2'>
				<Avatar
					imageUrl={userInfo.imageUrl ?? undefined}
					state={getDisplayedStatus(
						userInfo?.status,
						userInfo?.previouslySetStatus,
					)}
				/>
				<div>
					<p className='dark:text-white self-start text-black font-bold font-inter text-sm sm:text-md'>
						{userInfo.name}
					</p>
					<p
						className={`${isInFocus ? 'text-[#7C5CFC]' : 'text-[#6B6B80]'} font-mono text-xs sm:text-md`}
					>
						{isInFocus ? 'In focus' : isMicOn ? 'Speaking' : 'Listening'}
					</p>
				</div>
			</div>

			{isMicOn ? (
				<Mic color='#6B6B80' strokeWidth={1} />
			) : (
				<MicOff color='#6B6B80' strokeWidth={1} />
			)}
		</li>
	)
}
