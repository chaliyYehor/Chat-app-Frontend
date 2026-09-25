import { Button } from '@mui/material'
import { EllipsisVertical } from 'lucide-react'

export default function MoreInfoButton() {
	return (
		<Button
			sx={{
				width: '50px',
				minWidth: '0',
				height: '50px',
				borderRadius: '10px',
				fontSize: '1rem',
				textTransform: 'none',
				color: '#6B6B80',
				borderColor: '#333',
				transition: 'all 0.2s ease-in-out',

				'&:hover': {
					backgroundColor: '#1f1f26',
					borderColor: '#444',
					color: '#eee',
				},
			}}
		>
			<EllipsisVertical />
		</Button>
	)
}
