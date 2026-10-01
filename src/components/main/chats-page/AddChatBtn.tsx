import { Button } from '@mui/material'
import type { Dispatch, SetStateAction } from 'react'
import type { RootType } from '../../../store/store'
import { useSelector } from 'react-redux'

export default function AddChatBtn({
	onClick,
}: {
	onClick: Dispatch<SetStateAction<boolean>>
}) {
	const appTheme = useSelector((state: RootType) => state.theme.mode)
	return (
		<Button
			onClick={() => onClick(true)}
			variant='contained'
			type='button'
			sx={{
				width: 40,
				minWidth: 0,
				height: 40,
				padding: 0,
				borderRadius: '0.5rem',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: appTheme === 'dark' ? '#1E1E26' : '#f0f0f4',
				border: 'none',
				fontSize: '1.5rem',
				color: appTheme === 'dark' ? 'white' : 'black',
			}}
			title='Add Chat'
			aria-label='Add chat'
		>
			+
		</Button>
	)
}
