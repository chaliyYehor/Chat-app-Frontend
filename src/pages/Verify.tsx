import { Mail } from 'lucide-react'
import BackToSignUp from '../components/BackToSignUp'

export default function Verify() {
	return (
		<div className='w-screen h-dvh flex flex-col justify-center items-center gap-5'>
			<div className='flex flex-col justify-center items-center gap-4'>
				<div className='messageUI w-14 h-14 rounded-2xl flex justify-center items-center'>
					<Mail size={30} color='white' />
				</div>
				<h1 className='text-white text-2xl font-bold'>Verify Your Email</h1>
				<p className='secondaryCol text-md'>
					We sent a verification email to{' '}
					<span className='text-white font-bold'>email</span>
				</p>
			</div>
			<BackToSignUp />
		</div>
	)
}
