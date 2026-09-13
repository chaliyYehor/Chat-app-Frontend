import { Box } from '@mui/material'
import FormTextField from './components/FormTextField'
import Label from './components/Label'
import SubmitBtn from './components/SubmitBtn'
import { useFormContext } from 'react-hook-form'
import type { LoginType } from '../../schemas/auth/login'

export default function LoginForm() {
	const {control} = useFormContext<LoginType>()
	
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				width: '100%',
				gap: '10px',
			}}
		>
			<div>
				<Label text='EMAIL' />
				<FormTextField control={control} name='email' type='text' label='you@example.com' />
			</div>
			<div>
				<Label text='PASSWORD' />
				<FormTextField control={control} name='password' type='password' label='••••••••' />
			</div>

			<SubmitBtn label='Sign In' />
		</Box>
	)
}
