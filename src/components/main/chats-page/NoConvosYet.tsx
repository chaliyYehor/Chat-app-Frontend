import { Button } from '@mui/material'
import { MessageSquare } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'

export default function NoConvosYet({
	onClick,
}: {
	onClick: Dispatch<SetStateAction<boolean>>
}) {
	return (
		<div className='flex-1 min-w-0 flex justify-center items-center mt-85 flex-col gap-2'>
			<div className='select-convo-ui flex flex-col justify-center items-center max-w-50 gap-2'>
				<div className='messageIco text-[#7C5CFC] flex justify-center items-center p-5 rounded-3xl border border-[#7c5cfc61] w-20 h-20'>
					<MessageSquare size={30} strokeWidth={1} />
				</div>

				<p className='text-[#F0F0F5] font-semibold text-xl text-center'>
					Select a conversation
				</p>
				<p className='text-md text-[#6B6B80] text-center'>
					Choose from your chats to start messaging
				</p>
			</div>
			<Button
				onClick={() => onClick(true)}
				type='submit'
				variant='contained'
				sx={{
					width: '158px',
					height: '40px',
					borderRadius: '10px',

					marginTop: '10px',

					background: 'linear-gradient(90deg, #7654E8 0%, #5437C9 100%)',

					color: '#fff',
					fontSize: '16px',
					fontWeight: 600,
					padding: '12px 0',
					textTransform: 'none',

					boxShadow: 'none',

					'&:hover': {
						background: 'linear-gradient(90deg, #7654E8 0%, #5437C9 100%)',
						boxShadow: 'none',
					},

					'&:active': {
						transform: 'scale(0.99)',
					},
				}}
			>
				+ New Message
			</Button>
		</div>
	)
}
