import { Link } from 'react-router-dom'
import Avatar from '../../Avatar'
import { useGetUserInfo } from '../../../../hooks/useGetUserInfo'
import type { AddChatResponseType } from '../../../../schemas/main/addChat'
import { getDisplayedStatus } from '../../../../lib/getDisplayedStatus'

export default function Person({
	isListItem = false,
	user,
	setIsAdding,
}: {
	isListItem?: boolean
	user: AddChatResponseType
	setIsAdding: React.Dispatch<React.SetStateAction<boolean>>
}) {
	const { data: userInfo } = useGetUserInfo()

	return (
		<Link
			to={'/chats/123'}
			onClick={() => setIsAdding(false)}
			style={{
				padding: isListItem ? '0' : '8px',
			}}
			className='chatPreview w-full h-17.5 flex justify-center items-center gap-3 dark:hover:bg-[#1e1e26] hover:bg-[#ebebf0] rounded-lg transition-all duration-200 ease-in-out'
		>
			<Avatar
				imageUrl={user.imageUrl ? user.imageUrl : undefined}
				state={getDisplayedStatus(user.status, user.previouslySetStatus)}
			/>
			<div className='flex-1 min-w-0 flex flex-col items-start dark:text-white'>
				<p className='truncate max-w-[60%] font-semibold'>{user.name}</p>
				<p className='text-[#6B6B80] capitalize text-sm font-inter text-[12px]'>
					{getDisplayedStatus(user.status, user.previouslySetStatus)}
				</p>
			</div>
		</Link>
	)
}
