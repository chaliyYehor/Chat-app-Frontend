import { useState } from 'react'
import { FormProvider, useForm, useFormContext, type SubmitHandler } from 'react-hook-form'
import type { ChatSearch as ChatSearchType } from '../../../schemas/main/chatSearch'
import AddChat from './AddChat'
import AddChatBtn from './AddChatBtn'
import { ChatSearch } from './ChatSearch'
import NoConvosYet from './NoConvosYet'
import ChatPreview, { type ChatMenuPosition } from './chat/ChatPreview'
import { addChatSchema, type AddChatType } from '../../../schemas/main/addChat'
import { zodResolver } from '@hookform/resolvers/zod/dist/zod.js'

export default function ChatList() {
	const [isAdding, setIsAdding] = useState(false)
	const [activeChatMenu, setActiveChatMenu] = useState<{
		id: string
		position: ChatMenuPosition
	} | null>(null)

	const { control, handleSubmit } = useFormContext<ChatSearchType>()

	const chats = true // Replace with actual logic to determine if there are chats

	const onSubmit: SubmitHandler<ChatSearchType> = data => {
		console.log(data)
	}

	function renderChatPreview(id: string) {
		return (
			<ChatPreview
				key={id}
				menuPosition={
					activeChatMenu?.id === id ? activeChatMenu.position : null
				}
				onOpenMenu={position => setActiveChatMenu({ id, position })}
				onCloseMenu={() => setActiveChatMenu(null)}
			/>
		)
	}

	const addChatMethods = useForm<AddChatType>({
		resolver: zodResolver(addChatSchema),
		defaultValues: {
			search: '',
		},
		mode: 'onSubmit',
	})

	return (
		<div className='chatListContainer h-full w-full min-w-0 dark:bg-[#16161b] bg-white pb-15'>
			<div className=' mb-10 flex flex-col gap-4 mt-5'>
				<div className='flex items-center justify-between px-4 py-2'>
					<h2 className='dark:text-white text-3xl font-bold '>Messages</h2>
					<AddChatBtn onClick={setIsAdding} />
				</div>
				<form onSubmit={handleSubmit(onSubmit)}>
					<ChatSearch control={control} name='search' isChatSearch={false} />
				</form>
			</div>

			{!chats ? (
				<NoConvosYet onClick={setIsAdding} />
			) : (
				<>
					<section className='px-4 font-semibold text-sm mb-5'>
						<h3 className='text-[#6B6B80] font-inter mb-3'>PINNED</h3>
						<div className='flex flex-col gap-4'>
							{renderChatPreview('pinned-1')}
							{renderChatPreview('pinned-2')}
							{renderChatPreview('pinned-3')}
							{renderChatPreview('pinned-4')}
							{renderChatPreview('pinned-5')}
						</div>
						<hr className='text-gray-500/50 mt-3' />
					</section>
					<section className='px-4 font-semibold text-sm'>
						<h3 className='text-[#6B6B80] font-inter mb-3'>ALL MESSAGES</h3>
						<div className='flex flex-col gap-4'>
							{renderChatPreview('all-1')}
							{renderChatPreview('all-2')}
							{renderChatPreview('all-3')}
							{renderChatPreview('all-4')}
							{renderChatPreview('all-5')}
						</div>
					</section>
				</>
			)}
			<FormProvider {...addChatMethods}>
				{isAdding && <AddChat setIsAdding={setIsAdding} />}
			</FormProvider>
		</div>
	)
}
