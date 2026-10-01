import { MessageSquare } from 'lucide-react'

export default function SelectConvoUi() {
	return (
		<div className='flex-1 min-w-0 h-full flex justify-center items-center '>
			<div className='select-convo-ui flex flex-col justify-center items-center max-w-50 gap-2'>
				<div className='messageIco text-[#7C5CFC] flex justify-center items-center p-5 rounded-3xl border border-[#7c5cfc61] w-20 h-20'>
					<MessageSquare size={30} strokeWidth={1} />
				</div>

				<p className='dark:text-[#F0F0F5] font-semibold text-xl text-center'>
					Select a conversation
				</p>
				<p className='text-md text-[#6B6B80] text-center'>
					Choose from your chats or groups to start messaging
				</p>
			</div>
		</div>
	)
}
