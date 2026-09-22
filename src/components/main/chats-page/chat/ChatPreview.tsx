import { Link } from 'react-router-dom'
import Avatar from '../../Avatar'
import MessagesIndicator from './MessagesIndicator'

export default function ChatPreview() {
	return (
		<Link
			to={'/chats/123'}
			className='chatPreview w-full h-17.5 flex justify-center items-center gap-3 hover:bg-[#1e1e26] p-2 rounded-lg transition-all duration-200 ease-in-out'
		> 
			<Avatar />
			<div className='flex-1 min-w-0 flex flex-col text-white'>
				<p className='truncate max-w-[60%] font-semibold'>Sofia Chen</p>
				<p className='truncate max-w-[80%] text-sm'>
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi quam
					rerum debitis mollitia eius eaque adipisci reiciendis quos itaque
					tempore.
				</p>
			</div>
			<div className='info flex flex-col items-end gap-1'>
				<p className='text-[#6B6B80] text-[13px] font-mono'>When</p>
				<MessagesIndicator />
			</div>
		</Link>
	)
}
