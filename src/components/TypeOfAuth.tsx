import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { useLocation, useNavigate } from 'react-router-dom'

export default function TypeOfAuth() {
	const navigate = useNavigate()
	const location = useLocation()

	const selected = location.pathname === '/login' ? 'signIn' : 'signUp'
	return (
		<ToggleButtonGroup
			exclusive
			value={selected}
			onChange={(_, value) => {
				if (value) {
					navigate(value === 'signIn' ? '/login' : '/signUp')
				}
			}}
			sx={{
				bgcolor: '#1b1b25',
				borderRadius: '10px',
				width: '100%',
				height: '44px',

				'& .MuiToggleButton-root': {
					color: '#6B6B80',
					bgcolor: '#1b1b25',
					textTransform: 'none',
					fontWeight: '600',
					border: 0,
					width: '100%',
					margin: '5px',
					borderRadius: '10px',
				},
				'& .Mui-selected': {
					bgcolor: '#16161B !important',
					color: '#F0F0F5 !important',
					borderRadius: '10px',
					boxShadow: '0px 1px 3px 0px #000000, 0px 1px 2px -1px #000000',
				},
			}}
		>
			<ToggleButton value='signIn'>Sign In</ToggleButton>
			<ToggleButton value='signUp'>Create Account</ToggleButton>
		</ToggleButtonGroup>
	)
}
