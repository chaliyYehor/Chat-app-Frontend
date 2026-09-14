import { useForm, type SubmitHandler } from 'react-hook-form'
import {
	resetPasswordSchema,
	type ResetPasswordType,
} from '../schemas/auth/ResetPassword'
import { zodResolver } from '@hookform/resolvers/zod'
import { Lock } from 'lucide-react'
import Label from '../components/Form/components/Label'
import FormTextField from '../components/Form/components/FormTextField'
import { Button } from '@mui/material'
import BackToSignUp from '../components/BackToSignUp'

export default function ResetPassword() {
	const { handleSubmit, control } = useForm<ResetPasswordType>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			confirmPassword: '',
			password: '',
		},
	})

	const onSubmit: SubmitHandler<ResetPasswordType> = data => {
		console.log(data)
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
						Reset Password
					</Button>

					<BackToSignUp />
				</div>
			</form>
		</div>
	)
}
