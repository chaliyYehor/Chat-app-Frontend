import { useState } from 'react'
import NoConvosYet from '../NoConvosYet'
import CreateGroup from '../groups/CreateGroup'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import CallsPreview from './CallsPreview'
import type { RootType } from '../../../../store/store'
import { useSelector } from 'react-redux'

export default function CallsList() {
	const [isAdding, setIsAdding] = useState(false)
	const [selected, setSelected] = useState('allCalls')
	const chats = true // Replace with actual logic to determine if there are chats

	const theme = useSelector((state: RootType) => state.theme.mode)

	return (
		<div className='chatListContainer h-dvh w-full min-w-0 dark:bg-[#16161b] bg-white'>
			<div className='upper mb-5 flex flex-col gap-4 mt-5'>
				<div className='flex items-center justify-between px-4 py-2'>
					<h2 className='dark:text-white text-3xl font-bold '>Calls</h2>
				</div>
				<div className='px-4'>
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
							bgcolor: theme === 'dark' ? '#1E1E26' : '#EBEBF0',
							borderRadius: '10px',
							width: '100%',
							height: '44px',

							'& .MuiToggleButton-root': {
								color: theme === 'dark' ? '#6B6B80' : '#8080A0',
								fontFamily: 'Inter',
								bgcolor: theme === 'dark' ? '#1E1E26' : '#EBEBF0',
								textTransform: 'none',
								fontWeight: '600',
								border: 0,
								width: '100%',
								margin: '5px',
								borderRadius: '10px',
								transition: '0.3s ease',
							},
							'& .Mui-selected': {
								bgcolor:
									theme === 'dark'
										? '#16161B !important'
										: '#FFFFFF !important',
								color:
									theme === 'dark'
										? '#F0F0F5 !important'
										: '#000000 !important',
								borderRadius: '8px',
							},
						}}
					>
						<ToggleButton value='allCalls'>All Calls</ToggleButton>
						<ToggleButton value='missed'>Missed</ToggleButton>
					</ToggleButtonGroup>
				</div>
			</div>

			{!chats ? (
				<NoConvosYet isCall onClick={setIsAdding} />
			) : (
				<>
					<section className='px-4 font-semibold text-sm mb-5'>
						<div className='flex flex-col gap-4'>
							<CallsPreview
								missed
								isIncoming
								isVideoCall
								groupUsers={['Name1', 'Name2', 'Name3', 'Name4', 'Name5']}
							/>
							<CallsPreview isIncoming={false} isVideoCall />
							<CallsPreview missed isIncoming isVideoCall={false} />
							<CallsPreview isIncoming={false} isVideoCall />
							<CallsPreview isIncoming isVideoCall={false} />
							<CallsPreview isIncoming={false} isVideoCall />
							<CallsPreview isIncoming={false} isVideoCall />
							<CallsPreview isIncoming={false} isVideoCall />
						</div>
					</section>
				</>
			)}
		</div>
	)
}
