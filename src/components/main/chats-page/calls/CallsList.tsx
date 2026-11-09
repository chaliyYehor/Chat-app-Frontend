import { useMemo, useState } from 'react'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useSelector } from 'react-redux'
import type { RootType } from '../../../../store/store'
import { useGetPreviousCalls } from '../../../../hooks/useGetPreviousCalls'
import NoConvosYet from '../NoConvosYet'
import CallsPreview from './CallsPreview'

function CallsListSkeleton() {
	return (
		<div
			className='flex flex-col gap-2 px-2'
			role='status'
			aria-label='Loading call history'
		>
			{Array.from({ length: 6 }, (_, index) => (
				<div
					key={index}
					className='flex h-18 items-center gap-3 rounded-lg px-2'
				>
					<div className='skeleton-shimmer size-15 shrink-0 rounded-full' />
					<div className='flex min-w-0 flex-1 flex-col gap-2'>
						<div className='skeleton-shimmer h-4 w-2/3 rounded-md' />
						<div className='skeleton-shimmer h-3 w-1/3 rounded-md' />
					</div>
					<div className='flex flex-col items-end gap-2'>
						<div className='skeleton-shimmer h-3 w-14 rounded-md' />
						<div className='flex gap-1'>
							<div className='skeleton-shimmer size-10 rounded-lg' />
							<div className='skeleton-shimmer size-10 rounded-lg' />
						</div>
					</div>
				</div>
			))}
			<span className='sr-only'>Loading calls</span>
		</div>
	)
}

export default function CallsList() {
	const [, setIsAdding] = useState(false)
	const [selected, setSelected] = useState<'allCalls' | 'missed'>('allCalls')
	const {
		data: calls,
		isError: isCallsError,
		isPending: isCallsPending,
	} = useGetPreviousCalls()
	const theme = useSelector((state: RootType) => state.theme.mode)
	const visibleCalls = useMemo(
		() =>
			calls?.filter(
				call =>
					selected === 'allCalls' ||
					call.currentUser.status === 'missed' ||
					call.currentUser.status === 'declined',
			) ?? [],
		[calls, selected],
	)

	return (
		<div className='chatListContainer flex h-full min-h-0 w-full min-w-0 flex-col bg-white pb-15 dark:bg-[#16161b]'>
			<div className='flex items-center  justify-between px-4 py-2 mt-5'>
				<h2 className='text-3xl font-bold text-black dark:text-white'>Calls</h2>
			</div>
			<div className='upper self-center mb-5 mt-5 flex shrink-0 flex-col gap-4 '>
				<div className='px-4 '>
					<ToggleButtonGroup
						aria-label='Call history filter'
						exclusive
						value={selected}
						onChange={(_, value: 'allCalls' | 'missed' | null) => {
							if (value !== null) setSelected(value)
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

			<section className='flex-1 min-h-0 overflow-y-auto px-3 pb-4 font-semibold text-sm'>
				{isCallsPending ? (
					<CallsListSkeleton />
				) : isCallsError ? (
					<div className='flex h-full items-center justify-center px-4 text-center text-sm text-[#6B6B80]'>
						Failed to load call history. Try again later.
					</div>
				) : visibleCalls.length === 0 ? (
					selected === 'allCalls' ? (
						<NoConvosYet isCall onClick={setIsAdding} />
					) : (
						<div className='flex h-full items-center justify-center text-sm text-[#6B6B80]'>
							No missed calls
						</div>
					)
				) : (
					<div className='flex flex-col gap-2'>
						{visibleCalls.map(call => (
							<CallsPreview key={call.id} callInfo={call} />
						))}
					</div>
				)}
			</section>
		</div>
	)
}
