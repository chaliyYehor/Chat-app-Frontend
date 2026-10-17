import { useState } from 'react'
import Avatar from './Avatar'
import UserInfo from './UserInfo'
import { useGetUserInfo } from '../../hooks/useGetUserInfo'

export default function Profile() {
	const [isProfileOpened, setIsProfileOpened] = useState(false)

	const {data: userInfo, isPending} = useGetUserInfo()
	return (
		<>
			{isProfileOpened && <UserInfo sharedMedia={false} isYourProfile setIsProfileOpened={setIsProfileOpened} />}
			<button
				onClick={() => setIsProfileOpened(true)}
				type='button'
				className='cursor-pointer hover:outline-2 hover:outline-[#7C5CFC] transition-all duration-200 ease-in-out rounded-full'
			>
				{isPending ? (
					<div className='w-15 h-15 rounded-[50%] bg-gray-300 dark:bg-gray-600' />
				) : (
					<Avatar imageUrl={userInfo?.imageUrl || undefined} state={userInfo?.status || 'offline'} />
				)}
			</button>
		</>
	)
}
