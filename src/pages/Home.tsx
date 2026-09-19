import { Outlet, useNavigate } from 'react-router-dom'
import { authClient } from '../lib/auth-client'
import { useEffect } from 'react'
import MessageSectionBtn from '../components/main/MessageSectionBtn'
import GroupsSectionBtn from '../components/main/GroupsSectionBtn'
import { RiMessage2Fill } from 'react-icons/ri'
import CallsSectionBtn from '../components/main/CallsSectionBtn'
import SettingsSectionBtn from '../components/main/SettingsSectionBtn'
import Profile from '../components/main/Profile'
import SelectConvoUi from '../components/main/SelectConvoUi'

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
			<div className='w-screen h-screen absolute top-0 left-0 flex justify-center items-center'>
				<div className='loader dark:bg-white bg-black' />
			</div>
		)
	}

	// async function logout() {
	// 	await authClient.signOut()
	// 	navigate('/login', { replace: true })
	// }
	return (
		<>
			<div className='w-screen h-dvh flex'>
				<nav className='flex flex-col gap-5 w-25 items-center justify-between h-dvh py-4'>
					<div className='w-full flex flex-col justify-center items-center gap-2'>
						<div className='messageUI w-14 h-14 rounded-2xl flex justify-center items-center mb-3'>
							<RiMessage2Fill color='white' size={30} />
						</div>
						<MessageSectionBtn isSmallScreen={false} />
						<GroupsSectionBtn isSmallScreen={false} />
						<CallsSectionBtn isSmallScreen={false} />
						<SettingsSectionBtn isSmallScreen={false} />
					</div>

					<Profile />
				</nav>

				<main className='flex-1 flex min-w-0'>
					<div className='w-100 shrink-0'>
						<Outlet />
					</div>
					<SelectConvoUi />
				</main>
			</div>
		</>
	)
}
