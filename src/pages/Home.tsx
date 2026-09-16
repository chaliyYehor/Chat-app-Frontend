import { Link, useNavigate } from 'react-router-dom'
import { authClient } from '../lib/auth-client'
import { useEffect } from 'react'
import MessageSectionBtn from '../components/main/MessageSectionBtn'
import GroupsSectionBtn from '../components/main/GroupsSectionBtn'
import { RiMessage2Fill } from 'react-icons/ri'
import CallsSectionBtn from '../components/main/CallsSectionBtn'

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
		<nav className='flex flex-col gap-5 w-25 items-center'>
			<Link to={'/'} className='messageUI w-14 h-14 rounded-2xl flex justify-center items-center'>
				<RiMessage2Fill color='white' size={30} />
			</Link>
			<MessageSectionBtn isSmallScreen={false} />
			<GroupsSectionBtn isSmallScreen={false} />
			<CallsSectionBtn isSmallScreen={false} />
		</nav>
	)
}
