import { useState } from 'react'
import type { ChatMenuPosition } from '../chat/ChatPreview'
import NoConvosYet from '../NoConvosYet'
import CreateGroup from './CreateGroup'
import GroupPreview from './GroupPreview'
import NewGroupChatBtn from './NewGroupChatBtn'

export default function GroupList() {
	const [isAdding, setIsAdding] = useState(false)
	const [activeGroupMenu, setActiveGroupMenu] = useState<{
		id: string
		position: ChatMenuPosition
	} | null>(null)

	const chats = true // Replace with actual logic to determine if there are chats

	function renderGroupPreview(id: string) {
		return (
			<GroupPreview
				key={id}
				menuPosition={
					activeGroupMenu?.id === id ? activeGroupMenu.position : null
				}
				onOpenMenu={position => setActiveGroupMenu({ id, position })}
				onCloseMenu={() => setActiveGroupMenu(null)}
			/>
		)
	}

	return (
		<div className='chatListContainer h-full w-full min-w-0 dark:bg-[#16161b] bg-white pb-15'>
			<div className='mb-10 flex flex-col gap-4 mt-5'>
				<div className='flex items-center justify-between px-4 py-2'>
					<h2 className='dark:text-white text-3xl font-bold '>Groups</h2>
					{chats && <NewGroupChatBtn isGroup onClick={setIsAdding} />}
				</div>
			</div>

			{!chats ? (
				<NoConvosYet isGroup onClick={setIsAdding} />
			) : (
				<>
					<section className='px-4 font-semibold text-sm mb-5'>
						<p className='text-[#6B6B80] font-inter mb-3'>YOUR GROUPS</p>
						<div className='flex flex-col gap-4'>
							{renderGroupPreview('group-1')}
							{renderGroupPreview('group-2')}
							{renderGroupPreview('group-3')}
							{renderGroupPreview('group-4')}
							{renderGroupPreview('group-5')}
						</div>
					</section>
				</>
			)}
			{isAdding && <CreateGroup setIsAdding={setIsAdding} />}
		</div>
	)
}
