import { TextField } from '@mui/material'
import Button from '@mui/material/Button'
import { X } from 'lucide-react'
import { createPortal } from 'react-dom'
import {
	useFieldArray,
	useFormContext,
	type SubmitHandler,
} from 'react-hook-form'
import type { GroupCreation } from '../../../../schemas/main/groupCreation'
import { ChatSearch } from '../ChatSearch'
import CreateGroupBtn from './CreateGroupBtn'
import PickPerson from './PickPerson'
import type { RootType } from '../../../../store/store'
import { useSelector } from 'react-redux'

export default function CreateGroup({
	setIsAdding,
}: {
	setIsAdding: React.Dispatch<React.SetStateAction<boolean>>
}) {
	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
	} = useFormContext<GroupCreation>()

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'peopleToAdd',
		keyName: 'fieldId',
	})

	const people = [
		{ id: 'sofia-chen', label: 'Sofia Chen' },
		{ id: 'john-doe', label: 'John Doe' },
		{ id: 'jane-smith', label: 'Jane Smith' },
	]

	const onSubmit: SubmitHandler<GroupCreation> = data => {
		console.log(data)
	}

	const appTheme = useSelector((state: RootType) => state.theme.mode)
	return createPortal(
		<div
			onClick={() => {
				setIsAdding(false)
			}}
			role='dialog'
			aria-modal='true'
			aria-labelledby='new-group-title'
			tabIndex={-1}
			className='fixed w-screen h-dvh cursor-pointer inset-0 bg-black/70 flex md:items-start justify-center z-50 backdrop-blur-xs'
		>
			<div
				onClick={e => e.stopPropagation()}
				className='relative flex justify-center'
			>
				<div className='addChat cursor-default dark:bg-[#16161B] bg-white md:w-100 md:h-142.5 h-[80vh] flex flex-col border border-white/50 rounded-t-3xl md:rounded-2xl overflow-hidden animate-fade-in my-20 p-3'>
					<div className='flex justify-between items-center px-4 py-3 border-b dark:border-white/10 border-black/10 relative'>
						<div className='flex flex-col items-start text-start'>
							<h2
								id='new-group-title'
								className='dark:text-[#F0F0F5] font-inter text-[20px] font-bold text-base'
							>
								New Message
							</h2>
							<p className='text-[#6B6B80] font-inter text-sm mt-0.5'>
								Name your group and choose members
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
								color: '#6B6B80',
								cursor: 'pointer',
								transition: '0.3s ease',
								'&:hover': {
									color: appTheme === 'dark' ? 'white' : 'black',
								},
							}}
							aria-label='Close new group dialog'
						>
							<X size={16} />
						</Button>
					</div>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className='flex flex-col flex-1 min-h-0 justify-between items-center border-b border-white/10 pt-4'
					>
						<div className='w-full border-b border-white/10 pb-4 flex flex-col gap-2'>
							<TextField
								variant='outlined'
								placeholder={'Group name'}
								{...register('groupName')}
								slotProps={{
									htmlInput: {
										'aria-label': 'group name',
									},
								}}
								error={!!errors.groupName}
								helperText={errors.groupName?.message}
								sx={{
									width: '100%',
									paddingInline: '15px',
									transition: 'all 0.2s ease-in-out',
									'& .MuiOutlinedInput-root': {
										borderRadius: '10px',
										backgroundColor: appTheme === 'dark' ? '#1f1f26' : '#ebebf0',
										height: '46px',

										'& .MuiOutlinedInput-notchedOutline': {
											borderColor: appTheme === 'dark' ? '#333' : '#ccc',
										},

										'&:hover .MuiOutlinedInput-notchedOutline': {
											borderColor: '#444',
										},

										'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
											borderColor: '#333',
											borderWidth: '1px',
										},
									},

									'& .MuiInputBase-input': {
										color: appTheme === 'dark' ? '#eee' : '#333',
									},
								}}
							/>
							<ChatSearch isChatSearch control={control} name='search' />
						</div>

						<div className='w-full suggestedPeople min-h-0 p-2 flex flex-1 flex-col gap-1 overflow-y-auto'>
							{people.map(person => {
								const selectedIndex = fields.findIndex(
									field => field.id === person.id,
								)

								return (
									<PickPerson
										key={person.id}
										person={person}
										isPicked={selectedIndex !== -1}
										add={append}
										remove={remove}
										selectedIndex={selectedIndex}
									/>
								)
							})}
						</div>

						<div className='w-full shrink-0'>
							<CreateGroupBtn />
						</div>
					</form>
				</div>
			</div>
		</div>,
		document.body,
	)
}
