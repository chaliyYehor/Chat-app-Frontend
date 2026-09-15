import { Lock } from 'lucide-react'
import Label from '../components/Form/components/Label'
import FormTextField from '../components/Form/components/FormTextField'
import { useForm, type SubmitHandler } from 'react-hook-form'
import {
	forgotPasswordSchema,
	type ForgotPasswordType,
} from '../schemas/auth/ForgotPassword'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@mui/material/Button'
import BackToSignUp from '../components/BackToSignUp'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authClient } from '../lib/auth-client'

export default function ForgotPassword() {
	const [globalError, setGlobalError] = useState('')

	const {
		control,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm<ForgotPasswordType>({
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: {
			email: '',
		},
	})

	const onSubmit: SubmitHandler<ForgotPasswordType> = async data => {
		const { email } = data

		const { error } = await authClient.requestPasswordReset({
			email,
			redirectTo: `${window.location.origin}/reset-password`,
		})

		if (error) {
			setGlobalError(error.message!)
			return
		}
	}

	const { data: session, isPending } = authClient.useSession()
	const navigate = useNavigate()
	useEffect(() => {
		if (!isPending && session) {
			navigate('/')
		}
	}, [isPending, session, navigate])
	if (isPending) {
		return (
			<div className='w-screen h-screen absolute top-0 left-0 flex justify-center items-center'>
				<div className='loader dark:bg-white bg-black' />
			</div>
		)
	}

	return (
		<div className='w-screen h-dvh flex justify-center items-center'>
			<form
				className='forgotPassword flex flex-col gap-5'
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className='flex flex-col justify-center items-center gap-2'>
					<div className='messageUI w-14 h-14 rounded-2xl flex justify-center items-center'>
						<Lock size={30} color='white' />
					</div>
					<h1 className='text-white text-2xl font-bold'>Forgot Password</h1>
					<p className='secondaryCol text-sm'>We'll send you a reset link</p>
				</div>

				<div>
					<Label text='EMAIL ADDRESS' htmlFor='email' />
					<FormTextField
						control={control}
						name='email'
						type='email'
						label='you@example.com'
						ariaLabel='Email address'
						autoComplete='email'
					/>
				</div>

				<div className='w-full h-full flex flex-col justify-center items-center gap-5'>
					<Button
						type='submit'
						variant='contained'
						disabled={isSubmitting}
						sx={{
							width: '100%',
							borderRadius: '10px',

							marginTop: '10px',

							background: 'linear-gradient(90deg, #7654E8 0%, #5437C9 100%)',

							color: '#fff',
							fontSize: '16px',
							fontWeight: 600,
							padding: '12px 0',
							textTransform: 'none',

							boxShadow: 'none',

							'&:hover': {
								background: 'linear-gradient(90deg, #7654E8 0%, #5437C9 100%)',
								boxShadow: 'none',
							},

							'&:active': {
								transform: 'scale(0.99)',
							},
						}}
					>
						{isSubmitting ? <div className='loader' /> : 'Send Reset Link'}
					</Button>

					<BackToSignUp />

					<p className='mt-1 min-h-5 first-letter:capitalize select-none text-sm text-red-500 dark:text-red-400 text-center'>
						{globalError || '\u00A0'}
					</p>
				</div>
			</form>
		</div>
	)
}
