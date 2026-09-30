import { useEffect } from 'react'
import { RiMessage2Fill } from 'react-icons/ri'
import { Outlet, useNavigate } from 'react-router-dom'
import CallsSectionBtn from '../components/main/CallsSectionBtn'
import GroupsSectionBtn from '../components/main/GroupsSectionBtn'
import MessageSectionBtn from '../components/main/MessageSectionBtn'
import Profile from '../components/main/Profile'
import SettingsSectionBtn from '../components/main/SettingsSectionBtn'
import { authClient } from '../lib/auth-client'

export default function Home() {
	const navigate = useNavigate()

	const { data: session, isPending } = authClient.useSession()

	useEffect(() => {
		if (!isPending && !session) {
			navigate('/signUp')
		}
	}, [isPending, session, navigate])

	if (isPending) {
		return (
			<div
				className='w-screen h-screen absolute top-0 left-0 flex justify-center items-center'
				role='status'
				aria-label='Loading'
			>
				<div className='loader dark:bg-white bg-black' aria-hidden='true' />
			</div>
		)
	}

	return (
		<>
			<div className='w-screen h-dvh flex'>
				<nav
					className='flex flex-col gap-5 w-25 items-center justify-between h-dvh py-4'
					aria-label='Main navigation'
				>
					<div className='w-full flex flex-col justify-center items-center gap-2'>
						<div
							className='messageUI w-14 h-14 rounded-2xl flex justify-center items-center mb-3'
							aria-label='Chat App'
						>
							<RiMessage2Fill color='white' size={30} aria-hidden='true' />
						</div>
						<MessageSectionBtn isSmallScreen={false} />
						<GroupsSectionBtn isSmallScreen={false} />
						<CallsSectionBtn isSmallScreen={false} />
						<SettingsSectionBtn isSmallScreen={false} />
					</div>

					<Profile />
				</nav>

				<main className=' dark:bg-black bg-white flex-1 flex min-w-0'>
					<Outlet />
				</main>
			</div>
		</>
	)
}
