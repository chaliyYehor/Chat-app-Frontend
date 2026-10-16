import { Button } from '@mui/material'
import { Check } from 'lucide-react'
import { useIsMobile } from '../../../hooks/useIsMobile'
import { useNavigate } from 'react-router-dom'

export function SettingsChangePasswordSuccess() {
	const isMobile = useIsMobile()
	const navigate = useNavigate()
	return (
		<div className='w-full h-full flex justify-center items-center'>
			<div className='flex flex-col justify-center items-center'>
				<div className='bg-[#00D4AA]/15 mb-5 h-20 w-20 flex items-center justify-center rounded-2xl'>
					<Check size={30} color='#00D4AA' />
				</div>
				<div className='flex items-center justify-between px-4 py-2 flex-col gap-2'>
					<h2 className='dark:text-white text-3xl font-bold '>
						Password updated
					</h2>
					<p className='text-[#6B6B80] max-w-[90%] text-md mb-1 block leading-relaxed text-center'>
						Your account is now secured with your new password.
					</p>
				</div>
				<Button
					type='submit'
					variant='contained'
					onClick={() => {
						navigate('/settings/security')
					}}
					sx={{
						width: isMobile ? '70%' : 'calc(100% - 32px)',
						maxWidth: '448px',
						height: '50px',
						borderRadius: '10px',
						alignSelf: 'center',
						marginTop: '10px',
						marginLeft: isMobile ? '-80px' : '16px',
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
					Back to Security
				</Button>
			</div>
		</div>
	)
}
