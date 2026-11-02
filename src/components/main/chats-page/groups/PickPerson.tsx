import clsx from 'clsx'
import { Check } from 'lucide-react'
import type { UseFieldArrayAppend, UseFieldArrayRemove } from 'react-hook-form'
import type { GroupCreation } from '../../../../schemas/main/groupCreation'
import Avatar from '../../Avatar'
import { getDisplayedStatus } from '../../../../lib/getDisplayedStatus'

interface PickPersonProps {
	add: UseFieldArrayAppend<GroupCreation>
	remove: UseFieldArrayRemove
	person: {
		userId: string
		name: string
		imageUrl: string | null
		status: 'online' | 'offline'
		previouslySetStatus: 'online' | 'offline' | 'away'
		lastSeen: Date
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
	return (
		<button
			type='button'
			aria-pressed={isPicked}
			onClick={() => {
				if (isPicked) {
					remove(selectedIndex)
					return
				}

				add({ id: person.userId })
			}}
			className={clsx(
				isPicked ? 'bg-[#7C5CFC]/10' : '',
				'chatPreview cursor-pointer w-full h-17.5 flex justify-center items-center gap-3 dark:hover:bg-[#1e1e26] hover:bg-[#ebebf0] p-2 rounded-lg transition-all duration-200 ease-in-out',
			)}
		>
			<Avatar
				imageUrl={person.imageUrl ?? undefined}
				state={getDisplayedStatus(person.status, person.previouslySetStatus)}
			/>
			<div className='flex-1 min-w-0 flex flex-col items-start dark:text-white'>
				<p className='truncate max-w-[60%] font-semibold'>{person.name}</p>
				<p className='text-[#6B6B80] capitalize text-sm font-inter text-[12px]'>
					{getDisplayedStatus(person.status, person.previouslySetStatus)}
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
