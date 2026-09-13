import { TextField } from '@mui/material'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import {
	Controller,
	type Control,
	type FieldPath,
	type FieldValues,
} from 'react-hook-form'
import type { SignUpType } from '../../../schemas/auth/signUp'

interface Props<T extends FieldValues> {
	label: string
	type: 'password' | 'text'
	control: Control<T>
	name: FieldPath<T>
}

export default function FormTextField<T extends FieldValues>({
	label,
	type,
	control,
	name,
}: Props<T>) {
	const [isVisible, setIsVisible] = useState(false)

	return (
		<div className='relative'>
			<Controller
				control={control}
				name={name}
				render={({ field, fieldState }) => (
					<TextField
						{...field}
						inputRef={field.ref}
						placeholder={label}
						variant='outlined'
						error={!!fieldState.error}
						helperText={fieldState.error?.message}
						type={type === 'password' && !isVisible ? 'password' : 'text'}
						sx={{
							width: '100%',
							'& .MuiOutlinedInput-root': {
								letterSpacing: type === 'password' ? '3px' : '0',
								borderRadius: '10px',
								backgroundColor: '#1f1f26',
								height: '46px',

								'& .MuiOutlinedInput-notchedOutline': {
									borderColor: '#333',
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
								color: '#eee',
								width: type === 'password' ? '85%' : '100%',
							},
						}}
					/>
				)}
			/>
			{type === 'password' && (
				<button
					className='absolute flex justify-center items-center right-5 top-6 cursor-pointer text-[#6B6B80]'
					onClick={() => setIsVisible(prev => !prev)}
				>
					{!isVisible ? (
						<Eye size={20} className='absolute' />
					) : (
						<EyeOff size={20} className='absolute' />
					)}
				</button>
			)}
		</div>
	)
}
