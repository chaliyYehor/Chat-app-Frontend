import { Box } from '@mui/material'
import FormTextField from './components/FormTextField'
import Label from './components/Label'
import SubmitBtn from './components/SubmitBtn'
import { useFormContext, type SubmitHandler } from 'react-hook-form'
import type { SignUpType } from '../../schemas/auth/signUp'

export default function SignUpForm() {
	const { control, handleSubmit } = useFormContext<SignUpType>()

	const onSubmit: SubmitHandler<SignUpType> = data => {
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
			<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2.5'>
				<div>
					<Label text='FULL NAME' htmlFor='name' />
					<FormTextField
						control={control}
						name='name'
						type='text'
						ariaLabel='Full name'
						autoComplete='name'
						label='Your name'
					/>
				</div>
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
						autoComplete='new-password'
						label='••••••••'
					/>
				</div>
				<div>
					<Label text='CONFIRM PASSWORD' htmlFor='confirmPassword' />
					<FormTextField
						control={control}
						name='confirmPassword'
						type='password'
						ariaLabel='Confirm password'
						autoComplete='new-password'
						label='••••••••'
					/>
				</div>

				<SubmitBtn label='Create Account' />
			</form>
		</Box>
	)
}
