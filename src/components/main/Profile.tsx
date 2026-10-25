import { useState } from 'react'
import Avatar from './Avatar'
import UserInfo from './UserInfo'
import { useGetUserInfo } from '../../hooks/useGetUserInfo'
import { getDisplayedStatus } from '../../lib/getDisplayedStatus'
import { authClient } from '../../lib/auth-client'

export default function Profile() {
	const [isProfileOpened, setIsProfileOpened] = useState(false)

	const { data: userInfo, isPending } = useGetUserInfo()
	const { data: session, isPending: isSessionPending } = authClient.useSession()
	return (
		<>
			{isProfileOpened && (
				<UserInfo
					userInfo={userInfo}
					isFetching={isPending || isSessionPending}
					email={session?.user?.email}
					sharedMedia={false}
					isYourProfile
					setIsProfileOpened={setIsProfileOpened}
				/>
			)}
			<button
				onClick={() => setIsProfileOpened(true)}
				type='button'
				className='cursor-pointer hover:outline-2 hover:outline-[#7C5CFC] transition-all duration-200 ease-in-out rounded-full'
			>
				{isPending ? (
					<div className='w-15 h-15 rounded-[50%] bg-gray-300 dark:bg-gray-600' />
				) : (
					<Avatar
						imageUrl={userInfo?.imageUrl || undefined}
						state={getDisplayedStatus(
							userInfo?.status,
							userInfo?.previouslySetStatus,
						)}
					/>
				)}
			</button>
		</>
	)
}
