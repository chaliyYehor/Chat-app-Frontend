import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { authClient } from '../lib/auth-client'

export default function NotFound() {
	const navigate = useNavigate()

	const { data: session } = authClient.useSession()
	return (
		<div className='w-screen h-dvh flex flex-col justify-center items-center gap-6'>
			<h2 className='text-[#7C5CFC] text-7xl font-bold err'>404</h2>
			<div className='flex flex-col items-center'>
				<p className='text-[#F0F0F5] text-2xl font-bold mb-2'>Page not found</p>
				<p className='text-sm text-[#6B6B80]'>
					The page you are looking for does not exist.
				</p>
			</div>

			<Button
				type='submit'
				variant='contained'
				onClick={() => navigate('/signUp')}
				sx={{
					borderRadius: '10px',

					marginTop: '10px',

					background: 'linear-gradient(90deg, #7654E8 0%, #5437C9 100%)',

					color: '#fff',
					fontSize: '16px',
					fontWeight: 600,
					padding: '12px 24px',
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
				{session ? 'Go Back' : 'Back to Sign Up'}
			</Button>
		</div>
	)
}
