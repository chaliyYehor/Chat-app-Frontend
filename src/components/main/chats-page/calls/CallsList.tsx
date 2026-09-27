import { useState } from 'react'
import NoConvosYet from '../NoConvosYet'
import GroupPreview from '../groups/GroupPreview'
import CreateGroup from '../groups/CreateGroup'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import Person from '../chat/Person'
import CallsPreview from './CallsPreview'

export default function CallsList() {
	const [isAdding, setIsAdding] = useState(false)
	const [selected, setSelected] = useState('allCalls')
	const chats = true // Replace with actual logic to determine if there are chats

	return (
		<div className='chatListContainer h-dvh w-full min-w-0 bg-[#16161b]'>
			<div className='upper mb-5 flex flex-col gap-4 mt-5'>
				<div className='flex items-center justify-between px-4 py-2'>
					<h2 className='text-white text-3xl font-bold '>Calls</h2>
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
							bgcolor: '#1E1E26',
							borderRadius: '10px',
							width: '100%',
							height: '44px',

							'& .MuiToggleButton-root': {
								color: '#6B6B80',
								bgcolor: '#1E1E26',
								textTransform: 'none',
								fontWeight: '600',
								border: 0,
								width: '100%',
								margin: '5px',
								borderRadius: '10px',
								transition: '0.3s ease',
								'&:hover': {
									bgcolor: '#16161B',
									color: 'white',
								},
							},
							'& .Mui-selected': {
								bgcolor: '#16161B !important',
								color: '#F0F0F5 !important',
								borderRadius: '10px',
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
			{isAdding && <CreateGroup setIsAdding={setIsAdding} />}
		</div>
	)
}
