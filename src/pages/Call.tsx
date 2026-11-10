import { LiveKitRoom, RoomAudioRenderer, useRoomContext } from '@livekit/components-react'
import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { RoomEvent } from 'livekit-client'
import { User } from 'lucide-react'
import CallBadge from '../components/main/chats-page/calls/CallBadge'
import Dial from '../components/main/chats-page/calls/Dial'
import { authClient } from '../lib/auth-client'
import { socket } from '../socket'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../store/store'
import { setPopUpError } from '../store/slices/popUpSlice'
import OutgoingCallScreen from '../components/main/chats-page/calls/OutgoingCallScreen'
import { useGetUserInfoChat } from '../hooks/useGetUserInfoChat'

type CallCredentials = { token: string; startedAt: number; serverNow: number; participantName?: string; callId?: string }

function getCallCredentials(state: unknown): CallCredentials | null {
	if (!state || typeof state !== 'object') return null
	const value = state as Partial<CallCredentials>
	if (typeof value.token !== 'string' || typeof value.startedAt !== 'number' || typeof value.serverNow !== 'number') return null
	return value as CallCredentials
}

function DirectAudioCallUi({ conversationId, startedAt, serverOffset, participantName, callId }: { conversationId: string; startedAt: number; serverOffset: number; participantName?: string; callId?: string }) {
	const room = useRoomContext()
	const navigate = useNavigate()
	const dispatch = useDispatch<AppDispatch>()
	const [now, setNow] = useState(Date.now())
	const [isSpeakerMuted, setIsSpeakerMuted] = useState(false)
	const [remoteParticipant, setRemoteParticipant] = useState(() => [...room.remoteParticipants.values()][0])
	const durationSeconds = Math.max(0, Math.floor((now + serverOffset - startedAt) / 1000))
	const duration = `${String(Math.floor(durationSeconds / 60)).padStart(2, '0')}:${String(durationSeconds % 60).padStart(2, '0')}`

	useEffect(() => {
		const intervalId = window.setInterval(() => setNow(Date.now()), 1000)
		return () => window.clearInterval(intervalId)
	}, [])

	useEffect(() => {
		const syncRemoteParticipant = () => setRemoteParticipant([...room.remoteParticipants.values()][0])
		room.on(RoomEvent.ParticipantConnected, syncRemoteParticipant)
		room.on(RoomEvent.ParticipantDisconnected, syncRemoteParticipant)
		syncRemoteParticipant()
		return () => {
			room.off(RoomEvent.ParticipantConnected, syncRemoteParticipant)
			room.off(RoomEvent.ParticipantDisconnected, syncRemoteParticipant)
		}
	}, [room])

	useEffect(() => {
		let ended = false
		let checkId: number | undefined
		const handleParticipantDisconnected = () => {
			window.clearTimeout(checkId)
			checkId = window.setTimeout(() => {
				if (ended || room.remoteParticipants.size > 0) return
				ended = true
				if (callId) socket.emit('call:leave', { callId, userId: room.localParticipant.identity })
				room.disconnect()
				dispatch(setPopUpError({ heading: 'Call ended', text: 'The other participant left the call.' }))
				navigate(`/chats/${conversationId}`, { replace: true })
			}, 0)
		}
		room.on(RoomEvent.ParticipantDisconnected, handleParticipantDisconnected)
		return () => {
			window.clearTimeout(checkId)
			room.off(RoomEvent.ParticipantDisconnected, handleParticipantDisconnected)
		}
	}, [callId, conversationId, dispatch, navigate, room])

	return (
		<div className='group-audio-call w-screen h-dvh dark:bg-black bg-white flex flex-col gap-3 px-3 py-3 sm:gap-4 sm:px-5 sm:py-5 items-center justify-between'>
			<RoomAudioRenderer muted={isSpeakerMuted} />
			<div className='w-full flex justify-between items-center gap-2'>
				<div>
					<span className='font-mono text-[10px] sm:text-xs text-[#6B6B80] uppercase select-none'>AUDIO CALL</span>
					<div className='flex items-center gap-2 sm:gap-3'>
						<h2 className='dark:text-white text-black font-bold font-inter text-lg sm:text-2xl md:text-3xl whitespace-nowrap'>{remoteParticipant?.name || participantName || 'Audio call'}</h2>
						<div className='size-2 rounded-full bg-[#00D4AA]' />
						<p className='text-[#6B6B80] font-mono text-sm sm:text-lg'>{duration}</p>
					</div>
				</div>
				<CallBadge text='CONNECTED' />
			</div>
			<div className='w-full flex flex-1 min-h-0 items-center justify-center'>
				<div className='w-full h-full max-w-3xl flex flex-col justify-between items-center overflow-hidden border border-black/8 dark:border-white/7 rounded-3xl p-4 sm:p-6 dark:bg-[#101014] bg-[#F5F5F8]'>
					<span className='self-start font-mono text-xs text-[#6B6B80]'>IN CALL</span>
					<div className='flex flex-col items-center gap-3'>
						<div className='size-24 sm:size-32 rounded-full dark:text-white flex justify-center items-center border-2 border-gray-700 bg-black/5 dark:bg-white/5'>
							<User size={40} />
						</div>
						<p className='text-[#6B6B80] font-mono text-sm'>{remoteParticipant?.isSpeaking ? 'SPEAKING' : 'LISTENING'}</p>
					</div>
					<div className='self-start'>
						<h2 className='dark:text-white text-black font-bold font-inter text-xl sm:text-2xl'>{remoteParticipant?.name || participantName || 'Connecting…'}</h2>
						<p className='text-[#6B6B80] mt-1 font-mono text-sm'>Audio call</p>
					</div>
				</div>
			</div>
			<div className='flex items-center gap-2 sm:gap-4 rounded-full border border-black/8 bg-white/90 px-2 sm:px-3 py-2 sm:py-3 shadow-2xl shadow-black/15 mb-2 sm:mb-5 dark:border-white/6 dark:bg-[#111115]/95 dark:shadow-black/50'>
				<Dial type='volume' isVolumeMuted={isSpeakerMuted} onVolumeToggle={() => setIsSpeakerMuted(value => !value)} />
				<Dial type='endCall' callId={callId} />
				<Dial type='microphone' />
			</div>
		</div>
	)
}

export default function Call() {
	const conversationId = useParams().chatId
	const { data: contact } = useGetUserInfoChat(conversationId)
	const location = useLocation()
	const incomingCredentials = useMemo(() => getCallCredentials(location.state), [location.state])
	const participantName = useMemo(() => {
		if (!location.state || typeof location.state !== 'object') return undefined
		const name = (location.state as { participantName?: unknown }).participantName
		return typeof name === 'string' ? name : undefined
	}, [location.state])
	const [credentials, setCredentials] = useState<CallCredentials | null>(incomingCredentials)
	const { data: session, isPending } = authClient.useSession()
	const navigate = useNavigate()
	const dispatch = useDispatch<AppDispatch>()

	useEffect(() => {
		if (incomingCredentials) {
			setCredentials(incomingCredentials)
			return
		}
		if (isPending) return
		if (!session?.user.id || !conversationId) {
			navigate('/chats', { replace: true })
			return
		}

		let settled = false
		let callAccepted = false
		const requestId = crypto.randomUUID()
		let joinTimerId: number | undefined
		const timeoutId = window.setTimeout(() => {
			if (settled) return
			settled = true
			dispatch(setPopUpError({ heading: 'Call timed out', text: 'No response was received.' }))
			navigate(`/chats/${conversationId}`, { replace: true })
		}, 35_000)
		const fail = (message: string) => {
			if (settled) return
			settled = true
			window.clearTimeout(timeoutId)
			dispatch(setPopUpError({ heading: 'Audio call', text: message }))
			navigate(`/chats/${conversationId}`, { replace: true })
		}
		const acceptCredentials = (response: {
			token?: string; startedAt?: number; serverNow?: number; participantName?: string; callId?: string
		}) => {
			if (settled || !response.token || typeof response.startedAt !== 'number' || typeof response.serverNow !== 'number') return
			settled = true
			callAccepted = true
			window.clearTimeout(timeoutId)
			setCredentials({ token: response.token, startedAt: response.startedAt, serverNow: response.serverNow, participantName: response.participantName, callId: response.callId })
		}
		const handleCallReady = (call: {
			conversationId: string; token?: string; startedAt?: number; serverNow?: number; participantName?: string; callId?: string
		}) => {
			if (call.conversationId === conversationId) acceptCredentials(call)
		}
		const handleCallFailed = (call: { conversationId: string; error?: string }) => {
			if (call.conversationId === conversationId) fail(call.error || 'The other user declined the call.')
		}
		socket.on('audio_call:ready', handleCallReady)
		socket.on('audio_call:failed', handleCallFailed)
		const join = () => {
			socket.off('connect_error', onConnectError)
			socket.emit('audio_call:join', { userId: session.user.id, conversationId, requestId }, (response: {
				success: boolean; error?: string; token?: string; startedAt?: number; serverNow?: number; participantName?: string; callId?: string
			}) => {
				if (settled) return
				if (!response?.success) {
					fail(response?.error || 'The server did not return call credentials.')
					return
				}
				acceptCredentials(response)
			})
		}
		function onConnectError() { fail('Could not connect to the call server.') }
		const scheduleJoin = () => {
			window.clearTimeout(joinTimerId)
			joinTimerId = window.setTimeout(join, 0)
		}
		if (!socket.connected) {
			socket.once('connect', scheduleJoin)
			socket.once('connect_error', onConnectError)
			socket.connect()
		} else scheduleJoin()
		return () => {
			if (!callAccepted) socket.emit('call:cancel', { requestId })
			settled = true
			window.clearTimeout(timeoutId)
			window.clearTimeout(joinTimerId)
			socket.off('audio_call:ready', handleCallReady)
			socket.off('audio_call:failed', handleCallFailed)
			socket.off('connect', scheduleJoin)
			socket.off('connect_error', onConnectError)
		}
	}, [conversationId, dispatch, incomingCredentials, isPending, navigate, session?.user.id])

	if (isPending) return <div className='w-screen h-dvh flex justify-center items-center' role='status' aria-label='Loading call'><div className='loader' aria-hidden='true' /></div>
	if (!credentials) return <OutgoingCallScreen name={contact?.name} imageUrl={contact?.imageUrl} type='audio' onCancel={() => navigate(`/chats/${conversationId}`, { replace: true })} />
	return (
		<LiveKitRoom connect audio token={credentials.token} serverUrl={import.meta.env.VITE_LIVEKIT_URL} className='contents'>
			<DirectAudioCallUi conversationId={conversationId ?? ''} startedAt={credentials.startedAt} serverOffset={credentials.serverNow - Date.now()} participantName={credentials.participantName || participantName} callId={credentials.callId} />
		</LiveKitRoom>
	)
}
