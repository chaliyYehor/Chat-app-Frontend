import { Box } from '@mui/material'
import FormTextField from './components/FormTextField'
import Label from './components/Label'
import SubmitBtn from './components/SubmitBtn'
import { useFormContext, type SubmitHandler } from 'react-hook-form'
import type { LoginType } from '../../schemas/auth/login'

export default function LoginForm() {
	const { control, handleSubmit } = useFormContext<LoginType>()

	const onSubmit: SubmitHandler<LoginType> = data => {
		console.log(data)
	}

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				width: '100%',
				gap: '10px',
			}}
		>
			<form className='flex flex-col gap-2.5' onSubmit={handleSubmit(onSubmit)}>
				<div>
					<Label text='EMAIL' htmlFor='email' />
					<FormTextField
						control={control}
						name='email'
						type='email'
						label='you@example.com'
						ariaLabel='Email address'
						autoComplete='email'
					/>
				</div>
				<div>
					<Label text='PASSWORD' htmlFor='password' />
					<FormTextField
						control={control}
						name='password'
						type='password'
						ariaLabel='Password'
						autoComplete='current-password'
						label='••••••••'
					/>
				</div>

				<SubmitBtn label='Sign In' />
			</form>
		</Box>
	)
}
