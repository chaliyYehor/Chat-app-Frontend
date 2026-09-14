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

export default function ForgotPassword() {
	const { control, handleSubmit } = useForm<ForgotPasswordType>({
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: {
			email: '',
		},
	})

	const onSubmit: SubmitHandler<ForgotPasswordType> = data => {
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
					<h1 className='text-white text-2xl font-bold'>Forgot Password</h1>
					<p className='secondaryCol text-sm'>We'll send you a reset link</p>
				</div>

				<div>
					<Label text='EMAIL ADDRESS' />
					<FormTextField
						control={control}
						name='email'
						type='text'
						label='you@example.com'
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
						Send Reset Link
					</Button>

					<BackToSignUp />
				</div>
			</form>
		</div>
	)
}
