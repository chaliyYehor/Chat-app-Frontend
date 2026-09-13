import { RiMessage2Fill } from 'react-icons/ri'
import TypeOfAuth from '../components/TypeOfAuth'
import { Box } from '@mui/material'
import OAuthBtn from '../components/OAuthBtn'
import OrWithEmail from '../components/OrWithEmail'
import LoginForm from '../components/Form/LoginForm'

export default function Login() {
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
					<OAuthBtn type='Google' />
					<OAuthBtn type='GitHub' />
				</Box>

				<OrWithEmail />

				<LoginForm />
			</div>
		</div>
	)
}
