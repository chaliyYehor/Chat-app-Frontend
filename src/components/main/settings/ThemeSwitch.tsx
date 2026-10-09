import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootType } from '../../../store/store'
import { setTheme } from '../../../store/slices/themeSlice'
import { useSetTheme } from '../../../hooks/useSetTheme'

export default function ThemeSwitch() {
	const theme = useSelector((state: RootType) => state.theme.mode)
	const dispatch = useDispatch<AppDispatch>()
	const { mutateAsync: switchTheme, isPending } = useSetTheme()

	return (
		<ToggleButtonGroup
			aria-label='Theme'
			exclusive
			value={theme}
			disabled={isPending}
			onChange={async (_, value) => {
				if (value !== null) {
					try {
						await switchTheme({theme: value})
						dispatch(setTheme(value))
					} catch (error) {
						console.error('couldn`t change theme settings')
					}
				}
			}}
			sx={{
				bgcolor: theme === 'dark' ? '#1E1E26' : '#EBEBF0',
				borderRadius: '8px',
				width: '120px',
				height: '38px',
				padding: '2px',

				'& .MuiToggleButton-root': {
					color: theme === 'dark' ? '#6B6B80' : '#8080A0',
					fontFamily: 'Inter',
					bgcolor: theme === 'dark' ? '#1E1E26' : '#EBEBF0',
					textTransform: 'none',
					fontWeight: '400',
					border: 0,
					width: '100%',

					borderRadius: '8px',
					transition: '0.3s ease',
				},
				'& .Mui-selected': {
					bgcolor:
						theme === 'dark' ? '#16161B !important' : '#FFFFFF !important',
					color: theme === 'dark' ? '#F0F0F5 !important' : '#000000 !important',
					borderRadius: '8px',
				},
			}}
		>
			<ToggleButton value='dark'>Dark</ToggleButton>
			<ToggleButton value='light'>Light</ToggleButton>
		</ToggleButtonGroup>
	)
}
