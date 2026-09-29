import { useState } from 'react'
import CallButon from '../chat/CallButton'
import VideoCallBtn from '../chat/VideoCallBtn'
import MoreInfoButton from '../chat/MoreInfoButton'
import Message from '../chat/Message'
import SendAMessage from '../chat/SendAMessage'
import GroupPfp from './GroupPfp'
import GroupInfo from './GroupInfo'
import ImageMessage from '../chat/ImageMessage'

export default function Group() {
	const [isProfileOpened, setIsProfileOpened] = useState(false)

	return (
		<div className='w-full h-full overflow-hidden flex flex-col'>
			<div className='p-4 shrink-0 flex w-full justify-between items-center border-b border-gray-700/60'>
				<div className='flex justify-center items-center gap-3'>
					{isProfileOpened && (
						<GroupInfo
							setIsProfileOpened={setIsProfileOpened}
						/>
					)}
					<button
						onClick={() => setIsProfileOpened(true)}
						type='button'
						className='cursor-pointer hover:outline-2 hover:outline-[#7C5CFC] transition-all duration-200 ease-in-out rounded-2xl'
					>
						<GroupPfp />
					</button>
					<div className='w-[70%]'>
						<p className='font-semibold font-inter text-md truncate text-white'>
							Design Team
						</p>
						<p className='text-[#6B6B80] text-[13px] font-inter text-xs'>
							4 members
						</p>
					</div>
				</div>
				<div className='h-full flex justify-center items-center gap-2'>
					<CallButon />
					<VideoCallBtn />
					<MoreInfoButton isGroup={true} />
				</div>
			</div>

			<div className='messages w-full min-h-0 flex-1 flex flex-col text-white p-5'>
				<Message isGroup isMe={true} />
				<Message isGroup isMe={false} />
				<ImageMessage isMe isGroup />
			</div>

			<SendAMessage />
		</div>
	)
}
