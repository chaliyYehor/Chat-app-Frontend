import { Button } from '@mui/material'
import { X } from 'lucide-react'
import { useFormContext, type SubmitHandler } from 'react-hook-form'
import type { ChatSearch as ChatSearchType } from '../../../schemas/main/chatSearch'
import Person from './chat/Person'
import { ChatSearch } from './ChatSearch'
import type { RootType } from '../../../store/store'
import { useSelector } from 'react-redux'

export default function AddChat({
	setIsAdding,
}: {
	setIsAdding: React.Dispatch<React.SetStateAction<boolean>>
}) {
	const { control, handleSubmit } = useFormContext<ChatSearchType>()

	const onSubmit: SubmitHandler<ChatSearchType> = data => {
		console.log(data)
	}

	const appTheme = useSelector((state: RootType) => state.theme.mode)
	return (
		<div
			onClick={() => {
				setIsAdding(false)
			}}
			role='dialog'
			aria-modal='true'
			aria-labelledby='new-message-title'
			tabIndex={-1}
			className='fixed w-screen h-dvh cursor-pointer inset-0 bg-black/70 flex md:items-start justify-center z-50 backdrop-blur-xs'
		>
			<div
				onClick={e => e.stopPropagation()}
				className='relative flex justify-center'
			>
				<div className='addChat cursor-default dark:bg-[#16161B] bg-white md:w-100 flex flex-col border border-white/50 rounded-t-3xl md:rounded-2xl overflow-hidden animate-fade-in my-20 md:max-h-142.5 h-[80vh] p-3'>
					<div className='flex justify-between items-center px-4 py-3 border-b border-white/10 relative'>
						<div className='flex flex-col items-start text-start'>
							<h2
								id='new-message-title'
								className='dark:text-[#F0F0F5] font-inter text-[20px] font-bold text-base'
							>
								New Message
							</h2>
							<p className='text-[#6B6B80] font-inter text-sm mt-0.5'>
								Choose a contact to start a chat
							</p>
						</div>
						<Button
							variant='contained'
							type='button'
							onClick={() => setIsAdding(false)}
							sx={{
								width: 32,
								minWidth: 0,
								height: 32,
								padding: 0,
								borderRadius: '50%',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								backgroundColor: appTheme === 'dark' ? '#1E1E26' : '#f0f0f4',
								border: 'none',
								color: appTheme === 'dark' ? '#F0F0F5' : '#6B6B80',
								cursor: 'pointer',
								transition: '0.3s ease',
								'&:hover': {
									color: appTheme === 'dark' ? 'white' : 'black',
								},
							}}
							aria-label='Close new message dialog'
						>
							<X size={16} />
						</Button>
					</div>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className='flex justify-between items-center border-b border-white/10 py-4'
					>
						<ChatSearch isChatSearch control={control} name='search' />
					</form>
					<div className='suggestedPeople p-2'>
						<Person setIsAdding={setIsAdding} />
						<Person setIsAdding={setIsAdding} />
						<Person setIsAdding={setIsAdding} />
						<Person setIsAdding={setIsAdding} />
						<Person setIsAdding={setIsAdding} />
						<Person setIsAdding={setIsAdding} />
					</div>
				</div>
			</div>
		</div>
	)
}
