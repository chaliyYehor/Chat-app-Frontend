import { LiveKitRoom, RoomAudioRenderer, VideoTrack, useRoomContext, useTracks } from '@livekit/components-react'
import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { RoomEvent, Track } from 'livekit-client'
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

type CallCredentials = {
	token: string
	startedAt: number
	serverNow: number
	callId?: string
}

function getCallCredentials(state: unknown): CallCredentials | null {
	if (!state || typeof state !== 'object') return null
	const value = state as Partial<CallCredentials>
	if (
		typeof value.token !== 'string' ||
		typeof value.startedAt !== 'number' ||
		typeof value.serverNow !== 'number'
	) {
		return null
	}
	return value as CallCredentials
}

function DirectVideoCallUi({ conversationId, callId }: { conversationId: string; callId?: string }) {
	const room = useRoomContext()
	const navigate = useNavigate()
	const dispatch = useDispatch<AppDispatch>()
	const [isSpeakerMuted, setIsSpeakerMuted] = useState(false)
	const cameraTracks = useTracks([Track.Source.Camera])
	const screenShareTracks = useTracks([Track.Source.ScreenShare])
	const visibleCameraTracks = cameraTracks.filter(track => !track.publication.isMuted)
	const visibleScreenShares = screenShareTracks.filter(track => !track.publication.isMuted)
	const remoteCameraTrack = visibleCameraTracks.find(track => !track.participant.isLocal)
	const localCameraTrack = visibleCameraTracks.find(track => track.participant.isLocal)
	const remoteScreenShareTrack = visibleScreenShares.find(track => !track.participant.isLocal)

	useEffect(() => {
		let hasEnded = false
		let disconnectCheckId: number | undefined
		const handleParticipantDisconnected = () => {
			// LiveKit may dispatch ParticipantDisconnected before its participant
			// map has been updated, so check on the next task.
			window.clearTimeout(disconnectCheckId)
			disconnectCheckId = window.setTimeout(() => {
				if (hasEnded || room.remoteParticipants.size > 0) return
				hasEnded = true
				if (callId) socket.emit('call:leave', { callId, userId: room.localParticipant.identity })
				room.disconnect()
				dispatch(setPopUpError({ heading: 'Call ended', text: 'The other participant left the call.' }))
				navigate(`/chats/${conversationId}`, { replace: true })
			}, 0)
		}
		room.on(RoomEvent.ParticipantDisconnected, handleParticipantDisconnected)
		return () => {
			window.clearTimeout(disconnectCheckId)
			room.off(RoomEvent.ParticipantDisconnected, handleParticipantDisconnected)
		}
	}, [callId, conversationId, dispatch, navigate, room])

	const displayedTrack = remoteScreenShareTrack ?? visibleScreenShares[0] ?? remoteCameraTrack

	return (
		<div className='relative w-screen h-dvh overflow-hidden bg-black'>
			<RoomAudioRenderer muted={isSpeakerMuted} />
			<div className='absolute z-10 top-2 sm:top-5 left-2 right-2 sm:left-5 sm:right-5 flex justify-between items-center'>
				<CallBadge text='Video Call' />
				<span className='font-mono text-[10px] sm:text-xs text-[#6B6B80]'>CONNECTED</span>
			</div>
			<div className='absolute inset-0 flex items-center justify-center overflow-hidden bg-black'>
				{displayedTrack ? (
					<VideoTrack trackRef={displayedTrack} className='w-full h-full object-contain' />
				) : (
					<div className='flex flex-col items-center gap-3 text-white'>
						<div className='size-20 sm:size-32 rounded-full border border-white/20 bg-[#202027] flex items-center justify-center'><User size={36} /></div>
						<p className='text-[#A1A1AA] text-sm'>Camera is off</p>
					</div>
				)}
				{displayedTrack && <span className='absolute top-3 left-3 sm:top-auto sm:bottom-4 sm:left-4 rounded-lg bg-black/55 px-2.5 py-1 text-xs sm:text-sm text-white'>{displayedTrack.participant.name || displayedTrack.participant.identity}</span>}
				{localCameraTrack && (
					<div className='absolute z-10 right-3 bottom-24 sm:right-6 sm:bottom-8 w-[28vw] min-w-24 max-w-60 aspect-video overflow-hidden rounded-xl border border-white/30 bg-[#202027] shadow-xl shadow-black/40'>
						<VideoTrack trackRef={localCameraTrack} className='w-full h-full object-cover' />
						<span className='absolute bottom-1 left-1.5 rounded bg-black/55 px-1.5 py-0.5 text-[10px] text-white'>You</span>
					</div>
				)}
				<div className='absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-4 rounded-full border border-white/10 bg-[#111115]/90 px-2 sm:px-3 py-2 sm:py-3 shadow-2xl shadow-black/40 backdrop-blur-md'>
					<Dial type='volume' isVolumeMuted={isSpeakerMuted} onVolumeToggle={() => setIsSpeakerMuted(value => !value)} />
					<Dial type='microphone' />
					<Dial type='endCall' callId={callId} />
					<Dial type='shareScreen' />
					<Dial type='camera' />
					<Dial type='cameraSwitch' />
				</div>
			</div>
		</div>
	)
}
export default function VideoCall() {
	const conversationId = useParams().chatId
	const { data: contact } = useGetUserInfoChat(conversationId)
	const location = useLocation()
	const incomingCredentials = useMemo(
		() => getCallCredentials(location.state),
		[location.state],
	)
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
			navigate(`/chats/${conversationId}`)
		}, 35_000)

		const fail = (message: string) => {
			if (settled) return
			settled = true
			window.clearTimeout(timeoutId)
			dispatch(setPopUpError({ heading: 'Video call', text: message }))
			navigate(`/chats/${conversationId}`)
		}

		const useCredentials = (value: Partial<CallCredentials>) => {
			if (
				settled ||
				typeof value.token !== 'string' ||
				typeof value.startedAt !== 'number' ||
				typeof value.serverNow !== 'number'
			) return

			settled = true
			callAccepted = true
			window.clearTimeout(timeoutId)
			setCredentials(value as CallCredentials)
		}

		const handleCallReady = (call: CallCredentials & { conversationId: string }) => {
			if (call.conversationId === conversationId) useCredentials(call)
		}
		socket.on('video_call:ready', handleCallReady)

		const join = () => {
			socket.off('connect_error', onConnectError)
			socket.emit(
				'video_call:join',
				{ userId: session.user.id, conversationId, requestId },
				(response: {
					success: boolean
					error?: string
					token?: string
					startedAt?: number
					serverNow?: number
					callId?: string
				}) => {
					if (settled) return
					if (!response?.success) {
						fail(response?.error || 'The server did not return call credentials.')
						return
					}
					useCredentials(response)
				},
			)
		}

		function onConnectError() {
			fail('Could not connect to the call server.')
		}
		const scheduleJoin = () => {
			window.clearTimeout(joinTimerId)
			joinTimerId = window.setTimeout(join, 0)
		}

		if (!socket.connected) {
			socket.once('connect', scheduleJoin)
			socket.once('connect_error', onConnectError)
			socket.connect()
		} else {
			scheduleJoin()
		}

		return () => {
			if (!callAccepted) socket.emit('call:cancel', { requestId })
			settled = true
			window.clearTimeout(timeoutId)
			window.clearTimeout(joinTimerId)
			socket.off('video_call:ready', handleCallReady)
			socket.off('connect', scheduleJoin)
			socket.off('connect_error', onConnectError)
		}
	}, [conversationId, dispatch, incomingCredentials, isPending, navigate, session?.user.id])

	if (!isPending && !credentials) return <OutgoingCallScreen name={contact?.name} imageUrl={contact?.imageUrl} type='video' onCancel={() => navigate(`/chats/${conversationId}`, { replace: true })} />
	if (isPending || !credentials) {
		return (
			<div className='w-screen h-dvh flex flex-col gap-3 justify-center items-center'>
				<div className='loader' role='status' aria-label='Connecting to video call' />
				<p className='text-[#6B6B80]'>Calling…</p>
			</div>
		)
	}

	return (
		<LiveKitRoom
			connect
			audio
			video
			token={credentials.token}
			serverUrl={import.meta.env.VITE_LIVEKIT_URL}
			className='contents'
		>
			<DirectVideoCallUi conversationId={conversationId ?? ''} callId={credentials.callId} />
		</LiveKitRoom>
	)
}
