import { Box } from '@mui/material'
import FormTextField from './components/FormTextField'
import Label from './components/Label'
import SubmitBtn from './components/SubmitBtn'
import { useFormContext, type SubmitHandler } from 'react-hook-form'
import type { SignUpType } from '../../schemas/auth/signUp'
import { authClient } from '../../lib/auth-client'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SignUpForm() {
	const [globalError, setGlobalError] = useState('')

	const navigate = useNavigate()

	const {
		control,
		handleSubmit,
		formState: { isSubmitting },
	} = useFormContext<SignUpType>()

	const onSubmit: SubmitHandler<SignUpType> = async data => {
		const { name, email, password } = data

		const { error } = await authClient.signUp.email({
			email,
			password,
			name,
			callbackURL: `${window.location.origin}/login`,
		})

		if (error) {
			setGlobalError(error.message!)
			return
		}
		navigate('/verify')
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

				<SubmitBtn label='Create Account' isSubmitting={isSubmitting} />

				<p className='mt-1 min-h-5 first-letter:capitalize select-none text-sm text-red-500 dark:text-red-400 text-center'>
					{globalError || '\u00A0'}
				</p>
			</form>
		</Box>
	)
}
