import { Box } from '@mui/material'
import FormTextField from './components/FormTextField'
import Label from './components/Label'
import SubmitBtn from './components/SubmitBtn'

export default function SignUpForm() {
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
				<Label text='FULL NAME' />
				<FormTextField type='text' label='Your name' />
			</div>
			<div>
				<Label text='EMAIL' />
				<FormTextField type='text' label='you@example.com' />
			</div>
			<div>
				<Label text='PASSWORD' />
				<FormTextField type='password' label='••••••••' />
			</div>
			<div>
				<Label text='CONFIRM PASSWORD' />
				<FormTextField type='password' label='••••••••' />
			</div>

			<SubmitBtn label='Create Account' />
		</Box>
	)
}
