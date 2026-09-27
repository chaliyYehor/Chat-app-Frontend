import { useState } from 'react'
import AddChat from '../chats-page/AddChat'
import AddChatBtn from '../chats-page/AddChatBtn'
import ChatPreview from '../chats-page/chat/ChatPreview'
import { ChatSearch } from '../chats-page/ChatSearch'
import NoConvosYet from '../chats-page/NoConvosYet'
import { useFormContext, type SubmitHandler } from 'react-hook-form'
import type { ChatSearch as ChatSearchType } from '../../../schemas/main/chatSearch'

export default function SettingsList() {
	return (
		<div className='chatListContainer h-dvh w-full min-w-0 bg-[#16161b]'>
			<div className='upper mb-10 flex flex-col gap-4 mt-5'>
				<div className='flex items-center justify-between px-4 py-2'>
					<h2 className='text-white text-3xl font-bold '>Settings</h2>
				</div>
			</div>

			{/* Settings content goes here */}
		</div>
	)
}
