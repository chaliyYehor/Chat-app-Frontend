import { useState } from 'react'
import { Link } from 'react-router-dom'
import ChatRightClick from '../chat/ChatRightClick'
import MessagesIndicator from '../chat/MessagesIndicator'
import GroupPfp from './GroupPfp'

export default function GroupPreview() {
	const [chatToolsPosition, setChatToolsPosition] = useState<{
		x: number
		y: number
	} | null>(null)

	function handleContextMenu(e: React.MouseEvent) {
		e.preventDefault()
		e.stopPropagation()
		setChatToolsPosition({ x: e.clientX, y: e.clientY })
	}
	return (
		<Link
			to={'/groups/123'}
			onContextMenu={handleContextMenu}
			className='chatPreview w-full h-17.5 flex justify-center items-center gap-3 dark:hover:bg-[#1e1e26] hover:bg-[#f0f0f4] p-2 rounded-lg transition-all duration-200 ease-in-out mt-3'
		>
			{chatToolsPosition && (
				<ChatRightClick
					position={chatToolsPosition}
					onClose={() => setChatToolsPosition(null)}
					isGroup={true}
				/>
			)}
			<GroupPfp />
			<div className='flex-1 min-w-0 flex flex-col dark:text-white'>
				<p className='truncate max-w-[60%] font-bold font-inter text-[16px]'>Design Team</p>
				<p className='truncate max-w-full text-sm text-[#6B6B80]'>
					4 members
				</p>
				<p className='truncate max-w-full text-sm text-[#6B6B80]'>
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi quam
					rerum debitis mollitia eius eaque adipisci reiciendis quos itaque
					tempore.
				</p>
			</div>
			<div className='info flex flex-col items-end  gap-1'>
				<MessagesIndicator />
			</div>
		</Link>
	)
}
