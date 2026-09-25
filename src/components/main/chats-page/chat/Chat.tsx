import Avatar from '../../Avatar'
import CallButon from './CallButton'
import Message from './Message'
import MoreInfoButton from './MoreInfoButton'
import SendAMessage from './SendAMessage'
import VideoCallBtn from './VideoCallBtn'

export function Chat() {
	return (
		<div className='w-full h-full overflow-hidden flex flex-col'>
			<div className='p-4 shrink-0 flex w-full justify-between items-center border-b border-gray-700/60'>
				<div className='flex justify-center items-center gap-3'>
					<Avatar />
					<div className='w-[70%]'>
						<p className='font-semibold font-inter text-md truncate text-white'>
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
				<Message isMe={true} />
				<Message isMe={false} />
			</div>

			<SendAMessage />
		</div>
	)
}
