import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useEffect, useRef } from 'react'
import { RiMessage2Fill } from 'react-icons/ri'
import { Outlet, useNavigate } from 'react-router-dom'
import CallsSectionBtn from '../components/main/CallsSectionBtn'
import GroupsSectionBtn from '../components/main/GroupsSectionBtn'
import MessageSectionBtn from '../components/main/MessageSectionBtn'
import Profile from '../components/main/Profile'
import SettingsSectionBtn from '../components/main/SettingsSectionBtn'
import { useIsMobile } from '../hooks/useIsMobile'
import { authClient } from '../lib/auth-client'
import { useGetUserInfo } from '../hooks/useGetUserInfo'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../store/store'
import { setTheme } from '../store/slices/themeSlice'
import PopUpError from '../components/PopUpError'
import PopUpSuccess from '../components/PopUpSuccess'
import PopUpLoading from '../components/PopUpLoading'
import { setPopUpError } from '../store/slices/popUpSlice'
import { useAppSocket } from '../hooks/useAppSocket'
gsap.registerPlugin(useGSAP)

export default function Home() {
	const navigationRef = useRef<HTMLDivElement>(null)

	const navigate = useNavigate()
	const dispatch = useDispatch<AppDispatch>()

	const isMobile = useIsMobile()

	const { data: session, isPending } = authClient.useSession()
	useAppSocket(!isPending && Boolean(session))

	useEffect(() => {
		if (!isPending && !session) {
			navigate('/signUp')
		}
	}, [isPending, session, navigate])

	const { data: userInfo, isError: isUserInfoError } = useGetUserInfo()

	useEffect(() => {
		if (isUserInfoError) {
			dispatch(setPopUpError({
				heading: 'Error',
				text: 'Failed to load user info. Please try again.',
			}))
		}
	}, [dispatch, isUserInfoError])

	useEffect(() => {
		if (isPending || !userInfo) return

		dispatch(setTheme(userInfo.theme))
	}, [userInfo, isPending])

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
			<a
				href='#main-content'
				className='sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-black'
			>
				Skip to main content
			</a>
			<div className='w-screen h-dvh flex flex-col-reverse md:flex-row'>
				<PopUpError />
				<PopUpSuccess />
				<PopUpLoading />
				<nav
					className='flex z-20 flex-col gap-5 w-full md:w-25 items-center justify-between h-auto md:h-dvh py-4 dark:bg-black bg-[#f5f5f8]'
					aria-label='Main navigation'
				>
					<div
						ref={navigationRef}
						className='navigation w-full flex justify-around md:justify-center md:flex-col items-center md:gap-2'
					>
						{!isMobile && (
							<div
								className='messageUI w-14 h-14 rounded-2xl flex justify-center items-center mb-3'
								role='img'
								aria-label='Pulse'
							>
								<RiMessage2Fill color='white' size={30} aria-hidden='true' />
							</div>
						)}
						<MessageSectionBtn isSmallScreen={isMobile} />
						<GroupsSectionBtn isSmallScreen={isMobile} />
						<CallsSectionBtn isSmallScreen={isMobile} />
						<SettingsSectionBtn isSmallScreen={isMobile} />
					</div>

					{!isMobile && <Profile />}
				</nav>

				<main id='main-content' className='dark:bg-black bg-[#f5f5f8] flex-1 min-h-0 md:h-dvh flex min-w-0' tabIndex={-1}>
					<Outlet />
				</main>
			</div>
		</>
	)
}
