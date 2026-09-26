import { useState } from 'react'
import Avatar from './Avatar'
import UserInfo from './UserInfo'

export default function Profile() {
	const [isProfileOpened, setIsProfileOpened] = useState(false)
	return (
		<>
			{isProfileOpened && <UserInfo sharedMedia={false} isYourProfile setIsProfileOpened={setIsProfileOpened} />}
			<button
				onClick={() => setIsProfileOpened(true)}
				type='button'
				className='cursor-pointer hover:outline-2 hover:outline-[#7C5CFC] transition-all duration-200 ease-in-out rounded-full'
			>
				<Avatar />
			</button>
		</>
	)
}
