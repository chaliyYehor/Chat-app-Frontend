import { Link } from 'react-router-dom'
import Avatar from '../../Avatar'
import { useGetUserInfo } from '../../../../hooks/useGetUserInfo'

export default function Person({
	isListItem = false,
	setIsAdding,
}: {
	isListItem?: boolean
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
			<Avatar state={userInfo?.status || 'offline'} />
			<div className='flex-1 min-w-0 flex flex-col items-start dark:text-white'>
				<p className='truncate max-w-[60%] font-semibold'>Sofia Chen</p>
				<p className='text-[#6B6B80] text-sm font-inter text-[12px]'>Online</p>
			</div>
		</Link>
	)
}
