import clsx from 'clsx'
import { Check } from 'lucide-react'
import type { UseFieldArrayAppend, UseFieldArrayRemove } from 'react-hook-form'
import type { GroupCreation } from '../../../../schemas/main/groupCreation'
import Avatar from '../../Avatar'
import { useGetUserInfo } from '../../../../hooks/useGetUserInfo'
import { getDisplayedStatus } from '../../../../lib/getDisplayedStatus'
import type { AppDispatch } from '../../../../store/store'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setPopUpError } from '../../../../store/slices/popUpSlice'

interface PickPersonProps {
	add: UseFieldArrayAppend<GroupCreation>
	remove: UseFieldArrayRemove
	person: {
		id: string
		label: string
	}
	isPicked: boolean
	selectedIndex: number
}

export default function PickPerson({
	add,
	remove,
	person,
	isPicked,
	selectedIndex,
}: PickPersonProps) {
	const { data: userInfo, isError: isUserInfoError } = useGetUserInfo()
	const dispatch = useDispatch<AppDispatch>()

	useEffect(() => {
		if (isUserInfoError) {
			dispatch(
				setPopUpError({
					heading: 'Error',
					text: 'Failed to load user info. Please try again.',
				}),
			)
		}
	}, [isUserInfoError])
	return (
		<button
			type='button'
			onClick={() => {
				if (isPicked) {
					remove(selectedIndex)
					return
				}

				add(person)
			}}
			className={clsx(
				isPicked ? 'bg-[#7C5CFC]/10' : '',
				'chatPreview cursor-pointer w-full h-17.5 flex justify-center items-center gap-3 dark:hover:bg-[#1e1e26] hover:bg-[#ebebf0] p-2 rounded-lg transition-all duration-200 ease-in-out',
			)}
		>
			<Avatar
				state={getDisplayedStatus(
					userInfo?.status,
					userInfo?.previouslySetStatus,
				)}
			/>
			<div className='flex-1 min-w-0 flex flex-col items-start dark:text-white'>
				<p className='truncate max-w-[60%] font-semibold'>{person.label}</p>
				<p className='text-[#6B6B80] text-sm font-inter text-[12px]'>
					{getDisplayedStatus(
						userInfo?.status,
						userInfo?.previouslySetStatus,
					)}
				</p>
			</div>

			<div className='border dark:border-white/30 rounded-full w-5 h-5 overflow-hidden'>
				{isPicked && (
					<div className='w-full h-full bg-[#7C5CFC] flex justify-center items-center transition-all text-white'>
						<Check size={12} />
					</div>
				)}
			</div>
		</button>
	)
}
