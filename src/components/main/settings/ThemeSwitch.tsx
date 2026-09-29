import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useState } from 'react'

export default function ThemeSwitch() {
	const [selected, setSelected] = useState('dark')
	return (
		<ToggleButtonGroup
			aria-label='Authentication mode'
			exclusive
			value={selected}
			onChange={(_, value) => {
				if (value !== null) {
					setSelected(value)
				}
			}}
			sx={{
				bgcolor: '#1E1E26',
				borderRadius: '8px',
				width: '120px',
				height: '38px',
				padding: '2px',

				'& .MuiToggleButton-root': {
					color: '#6B6B80',
					fontFamily: 'Inter',
					bgcolor: '#1E1E26',
					textTransform: 'none',
					fontWeight: '400',
					border: 0,
					width: '100%',

					borderRadius: '8px',
					transition: '0.3s ease',
				},
				'& .Mui-selected': {
					bgcolor: '#16161B !important',
					color: '#F0F0F5 !important',
					borderRadius: '8px',
				},
			}}
		>
			<ToggleButton value='dark'>Dark</ToggleButton>
			<ToggleButton value='light'>Light</ToggleButton>
		</ToggleButtonGroup>
	)
}
