import { Box } from '@mui/material'
import FormTextField from './components/FormTextField'
import Label from './components/Label'
import SubmitBtn from './components/SubmitBtn'
import { useFormContext, type SubmitHandler } from 'react-hook-form'
import type { LoginType } from '../../schemas/auth/login'
import { authClient } from '../../lib/auth-client'
import { useNavigate } from 'react-router-dom'

interface Props {
	globalError: string
	setGlobalError: React.Dispatch<React.SetStateAction<string>>
}

export default function LoginForm({ globalError, setGlobalError }: Props) {
	const navigate = useNavigate()

	const {
		control,
		handleSubmit,
		formState: { isSubmitting },
	} = useFormContext<LoginType>()

	const onSubmit: SubmitHandler<LoginType> = async data => {
		const { email, password } = data

		const { error } = await authClient.signIn.email(
			{ email, password },
			{
				onSuccess: () => {
					navigate('/', { replace: true })
				},
			},
		)

		if (error) {
			setGlobalError(error.message!)
			return
		}
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
					<div className='flex justify-between items-center'>
						<Label text='PASSWORD' htmlFor='password' />
						<button
							onClick={() => navigate('/forgot-password')}
							type='button'
							className='text-[#7C5CFC] text-sm font-medium hover:underline cursor-pointer'
						>
							Forgot password?
						</button>
					</div>
					<FormTextField
						control={control}
						name='password'
						type='password'
						ariaLabel='Password'
						autoComplete='current-password'
						label='••••••••'
					/>
				</div>

				<SubmitBtn isSubmitting={isSubmitting} label='Sign In' />

				<p className='mt-1 min-h-5 first-letter:capitalize select-none text-sm text-red-500 dark:text-red-400 text-center'>
					{globalError || '\u00A0'}
				</p>
			</form>
		</Box>
	)
}
