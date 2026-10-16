import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@mui/material/Button'
import { Lock } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import FormTextField from '../components/form/components/FormTextField'
import Label from '../components/form/components/Label'
import { authClient } from '../lib/auth-client'
import { type ForgotPasswordType } from '../schemas/auth/forgotPassword'
import {
	setNewPasswordSchema,
	type SetNewPassword,
} from '../schemas/auth/setNewPassword'

export function SetNewPassword() {
	const [globalError, setGlobalError] = useState('')

	const [isSend, setIsSend] = useState(false)

	const { data, isPending: isSessionPending } = authClient.useSession()

	const {
		control,
		handleSubmit,
		formState: { isSubmitting },
		setValue,
	} = useForm<SetNewPassword>({
		resolver: zodResolver(setNewPasswordSchema),
		defaultValues: {
			email: '',
		},
	})

	useEffect(() => {
		if (!isSessionPending && !data) {
			navigate('/signUp')
		}
	}, [isSessionPending, data])
	useEffect(() => {
		if (isSessionPending || !data) {
			return
		}

		setValue('email', data.user.email)
	}, [isSessionPending, data])

	const onSubmit: SubmitHandler<ForgotPasswordType> = async data => {
		const { email } = data

		const { error } = await authClient.requestPasswordReset({
			email,
			redirectTo: `${window.location.origin}/resetPassword`,
		})

		if (error) {
			setGlobalError(error.message!)
			return
		}

		setIsSend(true)
	}

	const { data: session, isPending } = authClient.useSession()
	const navigate = useNavigate()
	useEffect(() => {
		if (!isPending && !session) {
			navigate('/chats')
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
					<h1 className='text-white text-2xl font-bold'>Set Password</h1>
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
						disabled={isSubmitting || isSend}
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
						{isSubmitting ? <div className='loader' /> : 'Send Link'}
					</Button>

					<button
						onClick={() => navigate(-1)}
						className='text-[#6B6B80] cursor-pointer text-sm hover:text-white flex justify-center items-center'
					>
						<span aria-hidden='true'>&#8592;</span>&nbsp;Back
					</button>
					{isSend && <p className='text-green-500 text-md flex justify-center items-center'>Check your email for the reset link.</p>}
					<p className='mt-1 min-h-5 first-letter:capitalize select-none text-sm text-red-500 dark:text-red-400 text-center'>
						{globalError || '\u00A0'}
					</p>
				</div>
			</form>
		</div>
	)
}
