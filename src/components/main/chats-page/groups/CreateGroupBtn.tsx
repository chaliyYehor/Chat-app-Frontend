import { Button } from '@mui/material'

export default function CreateGroupBtn({
	isDisabled,
	numberOfMembers,
	isLoading,
}: {
	isDisabled: boolean
	numberOfMembers: number
	isLoading: boolean
}) {
	return (
		<Button
			type='submit'
			variant='contained'
			disabled={isDisabled}
			aria-label='Create group'
			sx={{
				width: '100%',
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
			{isLoading ? (
				<div className='loader' />
			) : (
				`Create group · ${numberOfMembers} member${numberOfMembers > 1 ? 's' : ''}`
			)}
		</Button>
	)
}
