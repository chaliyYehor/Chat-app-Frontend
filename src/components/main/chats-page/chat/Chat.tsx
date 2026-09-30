import { useState } from 'react'
import Avatar from '../../Avatar'
import CallButon from './CallButton'
import Message from './Message'
import MoreInfoButton from './MoreInfoButton'
import SendAMessage from './SendAMessage'
import VideoCallBtn from './VideoCallBtn'
import UserInfo from '../../UserInfo'
import ImageMessage from './ImageMessage'

export function Chat() {
	const [isProfileOpened, setIsProfileOpened] = useState(false)

	return (
		<div className='w-full h-full overflow-hidden flex flex-col'>
			<div className='p-4 shrink-0 flex w-full justify-between items-center border-b border-gray-700/60'>
				<div className='flex justify-center items-center gap-3'>
					{isProfileOpened && (
						<UserInfo
							sharedMedia={true}
							isYourProfile={false}
							setIsProfileOpened={setIsProfileOpened}
						/>
					)}
					<button
						onClick={() => setIsProfileOpened(true)}
						type='button'
						className='cursor-pointer hover:outline-2 hover:outline-[#7C5CFC] transition-all duration-200 ease-in-out rounded-full'
						aria-label='Open profile'
					>
						<Avatar />
					</button>
					<div className='w-[70%]'>
						<p className='font-semibold font-inter text-md truncate dark:text-white'>
							Sofia Chen
						</p>
						<p className='text-[#6B6B80] text-[13px] font-inter text-xs'>
							Online
						</p>
					</div>
				</div>
				<div className='h-full flex justify-center items-center gap-2'>
					<CallButon />
					<VideoCallBtn />
					<MoreInfoButton />
				</div>
			</div>

			<div className='messages w-full min-h-0 flex-1 flex flex-col text-white p-5'>
				<Message isSeen isMe={true} />
				<Message isSeen isMe={false} />
				<ImageMessage isMe />
			</div>

			<SendAMessage />
		</div>
	)
}
