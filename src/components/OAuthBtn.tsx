import Button from '@mui/material/Button'
import GoogleIcon from '@mui/icons-material/Google'
import GitHubIcon from '@mui/icons-material/GitHub'

export default function OAuthBtn({ type }: { type: 'Google' | 'GitHub' }) {
	return (
		<Button
			variant='outlined'
			startIcon={type === 'GitHub' ? <GitHubIcon /> : <GoogleIcon />}
			sx={{
				width: '100%',
				height: '100%',
				borderRadius: '10px',
				fontSize: '1rem',
				textTransform: 'none',
				color: '#eee',
				borderColor: '#333',
				backgroundColor: '#1f1f26',

				'&:hover': {
					backgroundColor: '#25252d',
					borderColor: '#444',
				},
			}}
		>
			{type === 'GitHub' ? 'GitHub' : 'Google'}
		</Button>
	)
}
