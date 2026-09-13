import { Box } from '@mui/material'
import Label from './components/Label'
import FormTextField from './components/FormTextField'
import SubmitBtn from './components/SubmitBtn'

export default function LoginForm() {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				width: '100%',
				gap: '10px',
			}}
		>
			<div>
				<Label text='EMAIL' />
				<FormTextField type='text' label='you@example.com' />
			</div>
			<div>
				<Label text='PASSWORD' />
				<FormTextField type='password' label='••••••••' />
			</div>

			<SubmitBtn label='Sign In' />
		</Box>
	)
}
