import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { RiMessage2Fill } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import OAuthBtn from '../components/OAuthBtn'
import OrWithEmail from '../components/OrWithEmail'
import TypeOfAuth from '../components/TypeOfAuth'
import SignUpForm from '../components/form/SignUpForm'
import { useGithubAuth } from '../hooks/useGithubAuth'
import { useGoogleAuth } from '../hooks/useGoogleAuth'
import { authClient } from '../lib/auth-client'

export default function SignUp() {
	const [globalError, setGlobalError] = useState('')

	const { data: session, isPending } = authClient.useSession()
	const navigate = useNavigate()

	const {
		error: googleError,
		isLoading: isGoogleLoading,
		signInWithGoogle,
	} = useGoogleAuth()
	const {
		error: githubError,
		isLoading: isGithubLoading,
		signInWithGithub,
	} = useGithubAuth()

	useEffect(() => {
		if (googleError) {
			setGlobalError(googleError.message!)
		}
		if (githubError) {
			setGlobalError(githubError.message!)
		}
	}, [googleError, githubError])

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
		<div className='registrationContainer h-dvh w-screen backgroundRadial flex justify-center items-center'>
			<div className='registration flex flex-col gap-5 justify-center items-center'>
				<div className='flex flex-col justify-center items-center gap-2'>
					<div className='messageUI w-14 h-14 rounded-2xl flex justify-center items-center'>
						<RiMessage2Fill color='white' size={30} />
					</div>
					<h1 className='text-white text-2xl font-bold'>Pulse</h1>
					<p className='secondaryCol text-sm'>Connect with your world</p>
				</div>

				<TypeOfAuth />

				<Box
					sx={{
						display: 'flex',
						width: '100%',
						gap: '10px',
						marginBottom: '10px',
					}}
				>
					<OAuthBtn
						isSubmitting={isGoogleLoading}
						onClick={signInWithGoogle}
						type='Google'
					/>
					<OAuthBtn
						isSubmitting={isGithubLoading}
						onClick={signInWithGithub}
						type='GitHub'
					/>
				</Box>

				<OrWithEmail />

				<SignUpForm globalError={globalError} setGlobalError={setGlobalError} />
			</div>
		</div>
	)
}
