import { Mail } from 'lucide-react'
import BackToSignUp from '../components/BackToSignUp'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { authClient } from '../lib/auth-client'

export default function Verify() {
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
		<div className='w-screen h-dvh flex flex-col justify-center items-center gap-5'>
			<div className='flex flex-col justify-center items-center gap-4'>
				<div className='messageUI w-14 h-14 rounded-2xl flex justify-center items-center'>
					<Mail size={30} color='white' />
				</div>
				<h1 className='text-white text-2xl font-bold'>Verify Your Email</h1>
				<p className='secondaryCol text-md'>
					We've sent a verification email to your email address. Please check
					your inbox and follow the link to verify your account.
					<span className='text-white font-bold'>email</span>
				</p>
			</div>
			<BackToSignUp />
		</div>
	)
}
