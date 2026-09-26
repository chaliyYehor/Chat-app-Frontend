import { useState } from 'react'
import AddChat from '../AddChat'
import NoConvosYet from '../NoConvosYet'
import GroupPreview from './GroupPreview'
import NewGroupChatBtn from './NewGroupChatBtn'

export default function GroupList() {
	const [isAdding, setIsAdding] = useState(false)

	const chats = true // Replace with actual logic to determine if there are chats

	return (
		<div className='chatListContainer h-dvh w-full min-w-0 bg-[#16161b]'>
			<div className='upper mb-10 flex flex-col gap-4 mt-5'>
				<div className='flex items-center justify-between px-4 py-2'>
					<h2 className='text-white text-3xl font-bold '>Groups</h2>
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
							<GroupPreview />
							<GroupPreview />
							<GroupPreview />
							<GroupPreview />
							<GroupPreview />
						</div>
					</section>
				</>
			)}
			{isAdding && <AddChat setIsAdding={setIsAdding} />}
		</div>
	)
}
