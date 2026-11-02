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
				width: 'clamp(86px, 28vw, 158px)',
				minWidth: 0,
				maxWidth: '100%',
				height: { xs: '36px', sm: '40px' },
				borderRadius: { xs: '9px', sm: '10px' },

				marginTop: { xs: 0, sm: '10px' },

				background: 'linear-gradient(90deg, #7654E8 0%, #5437C9 100%)',

				color: '#fff',
				fontSize: { xs: '12px', sm: '16px' },
				fontWeight: 600,
				padding: { xs: '8px 10px', sm: '12px 0' },
				whiteSpace: 'nowrap',
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
			<span className='sm:hidden'>+ {isGroup ? 'Group' : 'Message'}</span>
			<span className='hidden sm:inline'>
				+ New {isGroup ? 'Group' : 'Message'}
			</span>
		</Button>
	)
}
