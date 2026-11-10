import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Outlet, useLocation } from 'react-router-dom'
import SettingsList from '../components/main/settings/SettingsList'
import { useIsMobile } from '../hooks/useIsMobile'
import { authClient } from '../lib/auth-client'

const possiblePreviousLocations = ['/chats', '/groups', '/calls', '/settings']

export default function Settings() {
	const location = useLocation()
	const { pathname } = location
	const isSettingsRoot = pathname === '/settings' || pathname === '/settings/'

	
	const isMobile = useIsMobile()
	
	const { isPending } = authClient.useSession()
	const currentLocation = location.pathname
	const isChatDetailsRoute = /^\/settings\//.test(currentLocation)
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
			if (isPending || isChatDetailsRoute) return

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
		<div className='flex w-full h-full min-h-0 min-w-0 relative'>
			<div
				className={`${
					isSettingsRoot ? 'flex' : 'hidden md:flex'
				} messagesSection chats outline-1 outline-gray-700/60 md:w-100 w-full shrink-0`}
			>
				<SettingsList />
			</div>
			<div
				className={`${
					isSettingsRoot ? 'hidden md:flex' : 'flex'
				} w-full md:flex-1 min-w-0 min-h-0 h-full`}
			>
				<Outlet />
			</div>
		</div>
	)
}
