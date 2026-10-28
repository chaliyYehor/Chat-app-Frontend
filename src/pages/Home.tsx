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
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootType } from '../store/store'
import { setTheme } from '../store/slices/themeSlice'
import { socket } from '../socket'
import {
	setGlobalSocketError,
	setIsSocketConnected,
} from '../store/slices/socketSlice'
import { useQueryClient } from '@tanstack/react-query'
import PopUpError from '../components/PopUpError'
import PopUpSuccess from '../components/PopUpSuccess'
import PopUpLoading from '../components/PopUpLoading'
import { setPopUpError } from '../store/slices/popUpSlice'
gsap.registerPlugin(useGSAP)

export default function Home() {
	const navigationRef = useRef<HTMLDivElement>(null)

	const navigate = useNavigate()
	const dispatch = useDispatch<AppDispatch>()

	const isMobile = useIsMobile()

	const { data: session, isPending } = authClient.useSession()

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

	const queryClient = useQueryClient()
	useEffect(() => {
		if (isPending || !session) return

		const handleConnect = () => {
			dispatch(setIsSocketConnected(true))
			dispatch(setGlobalSocketError(null))

			queryClient.invalidateQueries({
				queryKey: ['userInfo'],
			})

			queryClient.invalidateQueries({
				queryKey: ['chats'],
			})
		}

		const handleConnectError = (error: Error) => {
			dispatch(setIsSocketConnected(false))
			if (error.message === 'Too Many Requests') {
				dispatch(setGlobalSocketError('Too many requests'))
			} else if (error.message === 'Forbidden') {
				dispatch(setGlobalSocketError('Connection forbidden'))
			} else {
				dispatch(setGlobalSocketError('Unable to connect to server'))
			}
		}

		const handleDisconnect = () => {
			dispatch(setIsSocketConnected(false))
			dispatch(setGlobalSocketError(null))
		}

		const handleChatAdded = () => {
			queryClient.invalidateQueries({
				queryKey: ['chats'],
			})
		}

		const handleChatDeleted = () => {
			queryClient.invalidateQueries({
				queryKey: ['chats'],
			})
		}

		const handleMessageReceived = () => {
			queryClient.invalidateQueries({
				queryKey: ['chats'],
			})
		}

		const handleMessageDeleted = () => {
			queryClient.invalidateQueries({
				queryKey: ['chats'],
			})
		}

		socket.on('connect', handleConnect)
		socket.on('disconnect', handleDisconnect)
		socket.on('connect_error', handleConnectError)

		socket.on('chat:added', handleChatAdded)
		socket.on('chat:deleted', handleChatDeleted)
		socket.on('message:received', handleMessageReceived)
		socket.on('message:deleted', handleMessageDeleted)

		socket.connect()

		return () => {
			socket.off('connect', handleConnect)
			socket.off('disconnect', handleDisconnect)
			socket.off('connect_error', handleConnectError)
			socket.off('chat:added', handleChatAdded)
			socket.off('chat:deleted', handleChatDeleted)
			socket.off('message:received', handleMessageReceived)
			socket.off('message:deleted', handleMessageDeleted)
			socket.disconnect()
		}
	}, [dispatch, isPending, session])

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
								aria-label='Chat App'
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

				<main className='dark:bg-black bg-[#f5f5f8] flex-1 min-h-0 md:h-dvh flex min-w-0'>
					<Outlet />
				</main>
			</div>
		</>
	)
}
