import { Button } from '@mui/material'
import { Video } from 'lucide-react'
import { useSelector } from 'react-redux'
import type { RootType } from '../../../../store/store'
import { useNavigate } from 'react-router-dom'

export default function VideoCallBtn({isGroup, chatId, size = 20 }: { isGroup?: boolean; chatId?: string; size?: number }) {
	const appTheme = useSelector((state: RootType) => state.theme.mode)

	const navigate = useNavigate()
	return (
		<Button
			type='button'
			aria-label='Start video call'
			onClick={() => {
				if (chatId)
				navigate(isGroup ? `/groupVideoCall/${chatId}` : `/videoCall/${chatId}`)
			}}
			sx={{
				width: size === 20 ? '50px' : '40px',
				minWidth: '0',
				height: size === 20 ? '50px' : '40px',
				borderRadius: '10px',
				fontSize: '1rem',
				textTransform: 'none',
				color: '#6B6B80',
				borderColor: '#333',
				transition: 'all 0.2s ease-in-out',
			backgroundColor: 'transparent',

				'&:hover': {
					backgroundColor: appTheme === 'dark' ? '#1f1f26' : '#EBEBF0',
					borderColor: '#444',
					color: '#af6bfc',
				},
			}}
		>
			<Video size={size} aria-hidden='true' />
		</Button>
	)
}
