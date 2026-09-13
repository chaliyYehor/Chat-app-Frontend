import { Box } from '@mui/material'
import FormTextField from './components/FormTextField'
import Label from './components/Label'
import SubmitBtn from './components/SubmitBtn'
import { useFormContext } from 'react-hook-form'
import type { SignUpType } from '../../schemas/auth/signUp'

export default function SignUpForm() {
	const { control } = useFormContext<SignUpType>()

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
				<Label text='FULL NAME' />
				<FormTextField
					control={control}
					name='name'
					type='text'
					label='Your name'
				/>
			</div>
			<div>
				<Label text='EMAIL' />
				<FormTextField
					control={control}
					name='email'
					type='text'
					label='you@example.com'
				/>
			</div>
			<div>
				<Label text='PASSWORD' />
				<FormTextField
					control={control}
					name='password'
					type='password'
					label='••••••••'
				/>
			</div>
			<div>
				<Label text='CONFIRM PASSWORD' />
				<FormTextField
					control={control}
					name='confirmPassword'
					type='password'
					label='••••••••'
				/>
			</div>

			<SubmitBtn label='Create Account' />
		</Box>
	)
}
