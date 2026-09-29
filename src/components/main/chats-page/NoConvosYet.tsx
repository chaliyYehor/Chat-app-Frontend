import { MessageSquare } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'
import NewGroupChatBtn from './groups/NewGroupChatBtn'

export default function NoConvosYet({
	onClick,
	isGroup,
	isCall,
}: {
	isGroup?: boolean
	isCall?: boolean
	onClick: Dispatch<SetStateAction<boolean>>
}) {
	return (
		<div className='flex-1 min-w-0 flex justify-center items-center mt-85 flex-col gap-2'>
			<div className='select-convo-ui flex flex-col justify-center items-center max-w-50 gap-2'>
				<div className='messageIco text-[#7C5CFC] flex justify-center items-center p-5 rounded-3xl border border-[#7c5cfc61] w-20 h-20'>
					<MessageSquare size={30} strokeWidth={1} />
				</div>

				<p className='text-[#F0F0F5] font-semibold text-xl text-center'>
					{isGroup
						? 'No groups yet'
						: isCall
							? 'No calls yet'
							: 'No conversations yet'}
				</p>
				<p className='text-md text-[#6B6B80] text-center'>
					{isGroup
						? 'Start a new group to connect with others'
						: isCall
							? 'Start a new call to connect with someone'
							: 'Start a new chat to connect with someone'}
				</p>
			</div>
			{!isCall && <NewGroupChatBtn isGroup={isGroup} onClick={onClick} />}
		</div>
	)
}
