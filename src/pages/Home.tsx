import { useEffect } from 'react'
import { RiMessage2Fill } from 'react-icons/ri'
import { Outlet, useNavigate } from 'react-router-dom'
import CallsSectionBtn from '../components/main/CallsSectionBtn'
import GroupsSectionBtn from '../components/main/GroupsSectionBtn'
import MessageSectionBtn from '../components/main/MessageSectionBtn'
import Profile from '../components/main/Profile'
import SettingsSectionBtn from '../components/main/SettingsSectionBtn'
import { authClient } from '../lib/auth-client'
import { useIsMobile } from '../hooks/useIsMobile'

export default function Home() {
	const navigate = useNavigate()

	const isMobile = useIsMobile()

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
			<div className='w-screen h-dvh flex flex-col-reverse md:flex-row'>
				<nav
					className='flex flex-col gap-5 w-full md:w-25 items-center justify-between h-auto md:h-dvh py-4 dark:bg-black bg-[#f5f5f8]'
					aria-label='Main navigation'
				>
					<div className='w-full flex justify-around md:justify-center md:flex-col items-center md:gap-2'>
						{!isMobile &&<div
							className='messageUI w-14 h-14 rounded-2xl flex justify-center items-center mb-3'
							aria-label='Chat App'
						>
							<RiMessage2Fill color='white' size={30} aria-hidden='true' />
						</div>}
						<MessageSectionBtn isSmallScreen={isMobile} />
						<GroupsSectionBtn isSmallScreen={isMobile} />
						<CallsSectionBtn isSmallScreen={isMobile} />
						<SettingsSectionBtn isSmallScreen={isMobile} />
					</div>

					{!isMobile && <Profile />}
				</nav>

				<main className='dark:bg-black bg-[#f5f5f8] flex-1 min-h-0 md:h-dvh flex min-w-0'>
					<Outlet />
				</main>
			</div>
		</>
	)
}
