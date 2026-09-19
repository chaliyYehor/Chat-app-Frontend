import { InputAdornment, TextField } from '@mui/material'
import {
	Controller,
	type Control,
	type FieldPath,
	type FieldValues,
} from 'react-hook-form'
import type { ChatSearch } from '../../../schemas/main/chatSearch'
import { Search } from 'lucide-react'

interface Props<T extends FieldValues> {
	control: Control<T>
	name: FieldPath<T>
}

export default function ChatSearch<T extends FieldValues>({
	control,
	name,
}: Props<T>) {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState }) => (
				<TextField
					{...field}
					id={name}
					inputRef={field.ref}
					variant='outlined'
					placeholder='Search messages...'
					slotProps={{
						input: {
							startAdornment: (
								<InputAdornment position='start'>
									<Search size={20} color='#6B6B80' />
								</InputAdornment>
							),
						},
						htmlInput: {
							'aria-label': 'Search chats',
						},
					}}
					error={!!fieldState.error}
					helperText={fieldState.error?.message}
					sx={{
						width: '100%',
						paddingInline: '15px',
						'& .MuiOutlinedInput-root': {
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
						},
					}}
				/>
			)}
		/>
	)
}
