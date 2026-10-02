import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Outlet, useLocation } from 'react-router-dom'
import ChatList from '../components/main/chats-page/ChatList'
import { useIsMobile } from '../hooks/useIsMobile'
import { authClient } from '../lib/auth-client'

const possiblePreviousLocations = ['/chats', '/groups', '/calls', '/settings']

export default function Chats() {
	const isMobile = useIsMobile()

	const { isPending } = authClient.useSession()
	const location = useLocation()
	const currentLocation = location.pathname
	const previousLocation =
		typeof location.state?.from === 'string' ? location.state.from : undefined
	const currentIndex = possiblePreviousLocations.indexOf(currentLocation)
	const previousIndex = previousLocation
		? possiblePreviousLocations.indexOf(previousLocation)
		: -1
	const animationXPercent =
		currentIndex !== -1 &&
		previousIndex !== -1 &&
		currentIndex !== previousIndex
			? previousIndex < currentIndex
				? -100
				: 100
			: -100

	useGSAP(
		() => {
			if (isPending) return

			gsap.from('.chats', {
				xPercent: isMobile ? animationXPercent : -100,
				duration: 0.6,
				ease: 'power3.out',
			})
		},
		{
			dependencies: [isPending, isMobile, currentLocation, previousLocation],
			revertOnUpdate: true,
		},
	)

	return (
		<div className='flex w-full h-full min-w-0 relative'>
			<div className='chats messagesSection outline-1 outline-gray-700/60 md:w-100 w-full shrink-0 flex'>
				<ChatList />
			</div>
			<div className='flex-1 min-w-0 absolute top-0 left-0 md:relative md:top-auto md:left-auto h-full'>
				<Outlet />
			</div>
		</div>
	)
}
