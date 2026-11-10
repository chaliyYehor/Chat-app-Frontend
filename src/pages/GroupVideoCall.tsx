import { LiveKitRoom } from '@livekit/components-react'
import { useCallback, useEffect, useState } from 'react'
import { socket } from '../socket'
import { useNavigate, useParams } from 'react-router-dom'
import { authClient } from '../lib/auth-client'
import type { AppDispatch } from '../store/store'
import { useDispatch } from 'react-redux'
import { setPopUpError } from '../store/slices/popUpSlice'
import GroupVideoCallUi from '../components/main/chats-page/calls/GroupVideoCallUi'

export default function GroupVideoCall() {
	const [isLoading, setIsLoading] = useState(true)

	const [token, setToken] = useState<string | null>(null)
	const [callStartedAt, setCallStartedAt] = useState<number | null>(null)
	const [callId, setCallId] = useState<string | null>(null)
	const [serverTimeOffset, setServerTimeOffset] = useState(0)

	const groupId = useParams().chatId
	const { data: session, isPending } = authClient.useSession()
	const navigate = useNavigate()
	const dispatch = useDispatch<AppDispatch>()

	useEffect(() => {
		if (!isPending && !session) {
			navigate('/')
			dispatch(
				setPopUpError({
					heading: 'Unauthorized',
					text: 'You must be logged in to access this page.',
				}),
			)
		}
		if (!groupId) {
			navigate('/')
			dispatch(
				setPopUpError({
					heading: 'Invalid group',
					text: 'The group you are trying to access does not exist.',
				}),
			)
		}
	}, [session, isPending, groupId])

	const connectToRoom = useCallback(() => {
		setIsLoading(true)
		let settled = false
		const timeout = window.setTimeout(() => {
			if (settled) return
			settled = true
			dispatch(
				setPopUpError({
					heading: 'Connection timed out',
					text: 'The server did not respond while joining the group call. Please try again.',
				}),
			)
			navigate('/')
		}, 15000)

		const finishWithError = (text: string) => {
			if (settled) return
			settled = true
			window.clearTimeout(timeout)
			setIsLoading(false)
			dispatch(setPopUpError({ heading: 'Error', text }))
			navigate('/')
		}

		if (!socket.connected) socket.connect()
		if (!socket.connected) {
			// Wait for the socket connection; the timeout handles connection failures.
			socket.once('connect', join)
			socket.once('connect_error', onConnectError)
		} else {
			join()
		}

		function onConnectError() {
			finishWithError('Could not connect to the call server. Please try again.')
		}

		function join() {
			socket.off('connect_error', onConnectError)
			socket.emit(
				'group_video_call:join',
				{ userId: session?.user.id, groupId },
				({
					success,
					error,
					token,
					startedAt,
					serverNow,
					callId,
				}: {
					success: boolean
					error?: string
					token?: string
					startedAt?: number
					serverNow?: number
					callId?: string
				}) => {
					if (settled) return
					settled = true
					window.clearTimeout(timeout)
					if (!success || !token || !startedAt || !serverNow) {
						setIsLoading(false)
						dispatch(
							setPopUpError({
								heading: 'Error',
								text: error || 'The server did not return a call token.',
							}),
						)
						navigate('/')
						return
					}
					setToken(token)
					setCallStartedAt(startedAt)
					setCallId(callId ?? null)
					setServerTimeOffset(serverNow - Date.now())
					setIsLoading(false)
				},
			)
		}

		return () => {
			settled = true
			window.clearTimeout(timeout)
			socket.off('connect', join)
			socket.off('connect_error', onConnectError)
		}
	}, [dispatch, groupId, navigate, session?.user.id])

	useEffect(() => {
		if (isPending) return
		if (!groupId || !session?.user.id) {
			setIsLoading(false)
			return
		}

		return connectToRoom()
	}, [connectToRoom, groupId, isPending, session?.user.id])

	if (isPending || isLoading || !token || !callStartedAt || !callId)
		return (
			<div className='w-screen h-screen flex justify-center items-center'>
				<div className='loader' role='status' aria-label='Connecting to group video call' />
			</div>
		)

	return (
		<LiveKitRoom
			connect
			audio
			token={token}
			serverUrl={import.meta.env.VITE_LIVEKIT_URL}
			className='contents'
		>
			<GroupVideoCallUi
				groupId={groupId ?? ''}
				callId={callId}
				callStartedAt={callStartedAt}
				serverTimeOffset={serverTimeOffset}
			/>
		</LiveKitRoom>
	)
}
