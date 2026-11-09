import { Button } from '@mui/material'
import { Phone } from 'lucide-react'
import type { RootType } from '../../../../store/store'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function CallButon({
	isGroup,
	groupName,
	size = 20,
	chatId,
}: {
	size?: number
	chatId?: string
	groupName?: string
	isGroup?: boolean
}) {
	const appTheme = useSelector((state: RootType) => state.theme.mode)
	const navigate = useNavigate()
	return (
		<Button
			type='button'
			onClick={() => {
				if (chatId)
					navigate(
						isGroup ? `/groupCall/${chatId}` : `/call/${chatId}`,
						{
							state: groupName ?? '',
						},
					)
			}}
			aria-label='Start voice call'
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
			<Phone size={size} aria-hidden='true' />
		</Button>
	)
}
