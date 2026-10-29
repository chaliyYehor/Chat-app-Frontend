import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@mui/material'
import { Lock } from 'lucide-react'
import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import BackToSignUp from '../components/BackToSignUp'
import FormTextField from '../components/form/components/FormTextField'
import Label from '../components/form/components/Label'
import { authClient } from '../lib/auth-client'
import {
	resetPasswordSchema,
	type ResetPasswordType,
} from '../schemas/auth/resetPassword'


const token = new URLSearchParams(window.location.search).get('token')
export default function ResetPassword() {
	const [globalError, setGlobalError] = useState('')

	const {
		handleSubmit,
		control,
		formState: { isSubmitting },
	} = useForm<ResetPasswordType>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			confirmPassword: '',
			password: '',
		},
	})

	const navigate = useNavigate()

    const onSubmit: SubmitHandler<ResetPasswordType> = async ({
        password,
    }) => {
        if (!token) {
            setGlobalError('Invalid or missing token')
            return
        }

        const { error } = await authClient.resetPassword({
            newPassword: password,
            token,
        })

        if (error) {
            setGlobalError(error.message ?? 'Failed to reset password')
            return
        }

        navigate('/login')
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
					<h1 className='text-white text-2xl font-bold'>Reset Password</h1>
					<p className='secondaryCol text-sm'>Enter your new password below</p>
				</div>

				<div>
					<Label text='PASSWORD' htmlFor='password' />
					<FormTextField
						control={control}
						name='password'
						type='password'
						ariaLabel='New password'
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
						ariaLabel='Confirm new password'
						autoComplete='new-password'
						label='••••••••'
					/>
				</div>

				<div className='w-full h-full flex flex-col justify-center items-center gap-5'>
					<Button
						type='submit'
						variant='contained'
						aria-busy={isSubmitting}
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
						{isSubmitting ? <div className='loader' role='status' aria-label='Resetting password' /> : 'Reset Password'}
					</Button>

					<BackToSignUp />

					<p className='mt-1 min-h-5 first-letter:capitalize select-none text-sm text-red-500 dark:text-red-400 text-center' role='alert'>
						{globalError || '\u00A0'}
					</p>
				</div>
			</form>
		</div>
	)
}
