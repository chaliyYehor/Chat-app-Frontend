import { Button } from '@mui/material'
import { createPortal } from 'react-dom'
import { useSelector } from 'react-redux'
import type { RootType } from '../../../store/store'
import { useAccessibleDialog } from '../../../hooks/useAccessibleDialog'

export default function AreYouSure({
	isGroupChat = false,
	onCancel,
	onConfirm,
}: {
	isGroupChat?: boolean
	onCancel: () => void
	onConfirm: () => void
}) {
	const appTheme = useSelector((state: RootType) => state.theme.mode)
	const dialogRef = useAccessibleDialog(onCancel)

	return createPortal(
		<div
			ref={dialogRef}
			onClick={onCancel}
			role='dialog'
			aria-modal='true'
			aria-labelledby='clear-chat-confirmation-title'
			tabIndex={-1}
			className='fixed inset-0 z-100 flex h-dvh w-screen items-center justify-center bg-black/70 backdrop-blur-xs'
		>
			<div
				onClick={event => event.stopPropagation()}
				className='mx-4 flex w-full max-w-md flex-col gap-4 rounded-2xl border border-white/10 bg-white p-6 text-black shadow-2xl dark:bg-[#16161B] dark:text-white'
			>
				<div>
					<h2
						id='clear-chat-confirmation-title'
						className='text-xl font-bold font-inter'
					>
						{isGroupChat ? 'Clear this group chat?' : 'Clear this chat?'}
					</h2>
					<p className='mt-2 text-sm leading-relaxed text-[#6B6B80]'>
						{isGroupChat
							? 'This will permanently delete all messages for every group member.'
							: 'This will permanently delete all messages in this chat.'}
					</p>
				</div>
				<div className='flex w-full gap-3'>
					<Button
						type='button'
						variant='contained'
						onClick={onCancel}
						sx={{
							flex: 1,
							backgroundColor: appTheme === 'dark' ? '#19191f' : '#EBEBF0',
							color: appTheme === 'dark' ? '#fff' : '#000',
							textTransform: 'none',
							boxShadow: 'none',
							'&:hover': {
								backgroundColor: appTheme === 'dark' ? '#111116' : '#f1f1f3',
								boxShadow: 'none',
							},
						}}
					>
						Cancel
					</Button>
					<Button
						type='button'
						variant='contained'
						onClick={onConfirm}
						sx={{
							flex: 1,
							backgroundColor: '#FB2C36',
							color: '#fff',
							textTransform: 'none',
							boxShadow: 'none',
							'&:hover': {
								backgroundColor: '#c50f18',
								boxShadow: 'none',
							},
						}}
					>
						{isGroupChat ? 'Clear group chat' : 'Clear chat'}
					</Button>
				</div>
			</div>
		</div>,
		document.body,
	)
}
