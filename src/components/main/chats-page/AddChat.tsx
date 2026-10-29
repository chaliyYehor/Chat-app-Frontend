import { Button } from '@mui/material'
import { X } from 'lucide-react'
import { createPortal } from 'react-dom'
import { useFormContext, useWatch, type SubmitHandler } from 'react-hook-form'
import Person from './chat/Person'
import { ChatSearch } from './ChatSearch'
import type { AppDispatch, RootType } from '../../../store/store'
import { useDispatch, useSelector } from 'react-redux'
import type { AddChatType } from '../../../schemas/main/addChat'
import { useDebounce } from '../../../hooks/useDebounce'
import { useAddChat } from '../../../hooks/useAddChat'
import { socket } from '../../../socket'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { setPopUpError } from '../../../store/slices/popUpSlice'
import { useAccessibleDialog } from '../../../hooks/useAccessibleDialog'

export default function AddChat({
	setIsAdding,
}: {
	setIsAdding: React.Dispatch<React.SetStateAction<boolean>>
}) {
	const { control, handleSubmit } = useFormContext<AddChatType>()

	const [isLoading, setIsLoading] = useState(false)

	const search = useWatch({
		control,
		name: 'search',
	})

	const debouncedSearch = useDebounce(search, 500)

	const { data: people, isPending, isError: isAddChatError, isFetching } = useAddChat(debouncedSearch)

	useEffect(() => {
		if(isAddChatError) {
			dispatch(
				setPopUpError({
					heading: 'Error',
					text: 'Failed to load people. Please try again.',
				}),
			)
		}
	}, [isAddChatError])

	const onSubmit: SubmitHandler<AddChatType> = () => {}

	const appTheme = useSelector((state: RootType) => state.theme.mode)

	const queryClient = useQueryClient()

	const navigate = useNavigate()

	const dispatch = useDispatch<AppDispatch>()
	const dialogRef = useAccessibleDialog(() => setIsAdding(false))

	return createPortal(
		<div
			ref={dialogRef}
			onClick={() => {
				setIsAdding(false)
			}}
			role='dialog'
			aria-modal='true'
			aria-labelledby='new-message-title'
			tabIndex={-1}
			className='fixed w-screen h-dvh cursor-pointer inset-0 bg-black/70 flex md:items-start justify-center z-100 backdrop-blur-xs'
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
					{isPending && isFetching ? (
						<div className='w-full h-full flex justify-center items-center'>
							<div className='loader' role='status' aria-label='Loading contacts' />
						</div>
					) : (
						<div className='suggestedPeople p-2'>
							{people?.map(person => (
								<Person
									key={person.userId}
									isLoading={isLoading}
									setIsAdding={() => {
										setIsLoading(true)
										socket.emit(
											'chat:create-chat',
											{ userId: person.userId },
											async ({
												success,
												error,
												conversationId,
											}: {
												success: boolean
												error?: string
												conversationId?: string
											}) => {
												if (success) {
													console.log('Chat created successfully')
													await queryClient.invalidateQueries({
														queryKey: ['chats'],
													})
													setIsAdding(false)
													setIsLoading(false)
													navigate(`/chats/${conversationId}`)
												}
												if (error) {
													setIsLoading(false)

													if (error.includes('already exists')) {
														setIsAdding(false)
														navigate(`/chats/${conversationId}`)
													} else {
														dispatch(
															setPopUpError({
																heading: 'Error',
																text: 'Failed to create chat. Please try again.',
															}),
														)
													}
												}
											},
										)
									}}
									user={person}
								/>
							))}
						</div>
					)}
				</div>
			</div>
		</div>,
		document.body,
	)
}
