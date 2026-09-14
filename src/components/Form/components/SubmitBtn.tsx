import { Button } from '@mui/material'

export default function SubmitBtn({
	label,
	onClick,
}: {
	label?: 'Sign In' | 'Create Account',
	onClick?: () => void
}) {
	return (
		<Button
			type='submit'
			variant='contained'
			onClick={onClick}
			sx={{
				width: '100%',
				borderRadius: '10px',

				marginTop: '10px',

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
			{label}
		</Button>
	)
}
