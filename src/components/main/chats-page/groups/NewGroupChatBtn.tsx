import { Button } from '@mui/material'
import { type Dispatch, type SetStateAction } from 'react'

export default function NewGroupChatBtn({
	onClick,
	isGroup,
}: {
	isGroup?: boolean
	onClick: Dispatch<SetStateAction<boolean>>
}) {
	return (
		<Button
			onClick={() => onClick(true)}
			type='button'
			variant='contained'
			sx={{
				width: '158px',
				height: '40px',
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
			{isGroup ? '+ New Group' : '+ New Message'}
		</Button>
	)
}
