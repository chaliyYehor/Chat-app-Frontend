import { useFormContext, type SubmitHandler } from 'react-hook-form'
import AddChatBtn from './AddChatBtn'
import ChatSearch from './ChatSearch'
import type { ChatSearch as ChatSearchType } from '../../../schemas/main/chatSearch'
import ChatPreview from './chat/ChatPreview'

export default function ChatList() {
	const {
		control,
		handleSubmit,
	} = useFormContext<ChatSearchType>()

	const onSubmit: SubmitHandler<ChatSearchType> = data => {
		console.log(data)
	}
	return (
		<div className='chatListContainer h-dvh bg-[#16161b]'>
			<div className='upper mb-10 flex flex-col gap-4 mt-5'>
				<div className='flex items-center justify-between px-4 py-2'>
					<h2 className='text-white text-3xl font-bold '>Messages</h2>
					<AddChatBtn />
				</div>
				<form onSubmit={handleSubmit(onSubmit)}>
					<ChatSearch control={control} name='search' />
				</form>
			</div>

			<section className='px-4 font-semibold text-sm mb-5'>
				<p className='text-[#6B6B80] font-inter mb-3'>PINNED</p>
				<div className='flex flex-col gap-4'>
					<ChatPreview />
					<ChatPreview />
					<ChatPreview />
					<ChatPreview />
					<ChatPreview />
				</div>
				<hr className='text-gray-500/50 mt-3' />
			</section>
			<section className='px-4 font-semibold text-sm'>
				<p className='text-[#6B6B80] font-inter mb-3'>ALL MESSAGES</p>
				<div className='flex flex-col gap-4'>
					<ChatPreview />
					<ChatPreview />
					<ChatPreview />
					<ChatPreview />
					<ChatPreview />
				</div>
			</section>
		</div>
	)
}
