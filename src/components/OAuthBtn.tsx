import Button from '@mui/material/Button'
import GoogleIcon from '@mui/icons-material/Google'
import GitHubIcon from '@mui/icons-material/GitHub'

interface Props {
	type: 'Google' | 'GitHub'
	onClick: () => Promise<void>
	isSubmitting: boolean
}

export default function OAuthBtn({ type, onClick, isSubmitting }: Props) {
	return (
		<Button
			type='button'
			aria-label={`Sign in with ${type}`}
			aria-busy={isSubmitting}
			variant='outlined'
			disabled={isSubmitting}
			onClick={onClick}
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
			className='flex justify-center items-center gap-2'
		>
			{isSubmitting ? (
				<div className='loader' role='status' aria-label={`Signing in with ${type}`} />
			) : type === 'GitHub' ? (
				<>
					<GitHubIcon />
					GitHub
				</>
			) : (
				<>
					<GoogleIcon />
					Google
				</>
			)}
		</Button>
	)
}
