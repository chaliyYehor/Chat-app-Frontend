import Avatar from '../../Avatar'
import type { AddChatResponseType } from '../../../../schemas/main/addChat'
import { getDisplayedStatus } from '../../../../lib/getDisplayedStatus'
import clsx from 'clsx'
import Badge from '../Badge'

export default function Person({
	isListItem = false,
	user,
	setIsAdding,
	isLoading,
	isMe,
	className,
	isAdmin,
	isCreator
}: {
	isMe?: boolean
	isListItem?: boolean
	isLoading?: boolean
	user: AddChatResponseType
	setIsAdding: () => void
	className?: string
	isAdmin?: boolean
	isCreator?: boolean
}) {
	return (
		<button
			type='button'
			onClick={() => setIsAdding()}
			style={{
				padding: isListItem ? '0' : '8px',
			}}
			className={clsx(
				'cursor-pointer chatPreview w-full h-17.5 flex justify-center items-center gap-3 dark:hover:bg-[#1e1e26] hover:bg-[#ebebf0] rounded-lg transition-all duration-200 ease-in-out',
				className,
			)}
		>
			{isLoading ? (
				<div className='w-full h-full flex justify-center items-center'>
					<div
						className='loader'
						role='status'
						aria-label={`Opening chat with ${user.name}`}
					/>
				</div>
			) : (
				<>
					<Avatar
						isMe={isMe}
						imageUrl={user.imageUrl ? user.imageUrl : undefined}
						state={getDisplayedStatus(user.status, user.previouslySetStatus)}
					/>

					<div className='flex-1 min-w-0 flex flex-col items-start dark:text-white'>
						<p translate='no' className='truncate max-w-[60%] font-semibold'>
							{user.name}
						</p>
						<p className='text-[#6B6B80] capitalize text-sm font-inter text-[12px]'>
							{!isMe
								? getDisplayedStatus(user.status, user.previouslySetStatus)
								: 'You'}
						</p>
						
					</div>
					{isAdmin && <Badge text='Admin' />}
					{isCreator && <Badge text='Creator' />}
				</>
			)}
		</button>
	)
}
