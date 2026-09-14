import { RiMessage2Fill } from 'react-icons/ri'
import TypeOfAuth from '../components/TypeOfAuth'
import { Box } from '@mui/material'
import OAuthBtn from '../components/OAuthBtn'
import OrWithEmail from '../components/OrWithEmail'
import SignUpForm from '../components/Form/SignUpForm'
import { useGoogleAuth } from '../hooks/useGoogleAuth'
import { useGithubAuth } from '../hooks/useGithubAuth'
import { useEffect, useState } from 'react'

export default function SignUp() {
	const [globalError, setGlobalError] = useState('')

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
