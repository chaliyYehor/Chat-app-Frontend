import { Button } from '@mui/material'
import { Phone } from 'lucide-react'

export default function CallButon({ size = 20 }: { size?: number }) {
	return (
		<Button
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
				backgroundColor: size !== 20 ? '#1f1f26' : 'transparent',

				'&:hover': {
					backgroundColor: '#1f1f26',
					borderColor: '#444',
					color: '#eee',
				},
			}}
		>
			<Phone size={size} />
		</Button>
	)
}
