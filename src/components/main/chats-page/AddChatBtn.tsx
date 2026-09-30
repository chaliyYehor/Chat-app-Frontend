import { Button } from '@mui/material'
import type { Dispatch, SetStateAction } from 'react'

export default function AddChatBtn({
	onClick,
}: {
	onClick: Dispatch<SetStateAction<boolean>>
}) {
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
				backgroundColor: '#1E1E26',
				border: 'none',
				fontSize: '1.5rem',
			}}
			title='Add Chat'
			aria-label='Add chat'
		>
			+
		</Button>
	)
}
