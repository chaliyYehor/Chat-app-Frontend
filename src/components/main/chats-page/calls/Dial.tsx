import { TrackToggle, useRoomContext } from '@livekit/components-react'
import { Room, RoomEvent, Track } from 'livekit-client'
import {
	Mic,
	MicOff,
	Phone,
	SwitchCamera,
	ScreenShare,
	ScreenShareOff,
	Video,
	VideoOff,
	Volume2,
	VolumeX,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type DialType =
	| 'volume'
	| 'microphone'
	| 'endCall'
	| 'camera'
	| 'cameraSwitch'
	| 'shareScreen'

const dialOptions = {
	volume: { label: 'Toggle speaker', on: Volume2, off: VolumeX },
	microphone: { label: 'Toggle microphone', on: Mic, off: MicOff },
	camera: { label: 'Toggle camera', on: Video, off: VideoOff },
	shareScreen: { label: 'Share screen', on: ScreenShareOff, off: ScreenShare },
	cameraSwitch: { label: 'Switch camera', on: SwitchCamera, off: SwitchCamera },
	endCall: { label: 'End call', on: Phone, off: Phone },
}

export default function Dial({ type }: { type: DialType }) {
	const room = useRoomContext()

	const [enabled, setEnabled] = useState(true)
	const option = dialOptions[type]
	const Icon = enabled ? option.on : option.off
	const isEndCall = type === 'endCall'
	const [hasMultipleCameras, setHasMultipleCameras] = useState(false)
	const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user')

	function disconnect() {
		room.disconnect()
	}

	const navigate = useNavigate()
	const buttonClassName = `flex cursor-pointer ${isEndCall ? 'size-13' : 'size-12'} shrink-0 items-center justify-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500 dark:focus-visible:outline-white ${
		isEndCall
			? 'bg-[#FB2C36] text-white hover:bg-[#e9232d]'
			: 'bg-[#EBEBF0] text-[#111118] hover:bg-[#dedee5] dark:bg-[#202027] dark:text-white dark:hover:bg-[#2b2b34]'
	}`

	useEffect(() => {
		if (type !== 'cameraSwitch') return

		let isMounted = true
		const updateCameraAvailability = async () => {
			if (!room.localParticipant.isCameraEnabled) {
				if (isMounted) setHasMultipleCameras(false)
				return
			}

			try {
				const cameras = await Room.getLocalDevices('videoinput', false)
				if (isMounted) setHasMultipleCameras(cameras.length > 1)
			} catch {
				if (isMounted) setHasMultipleCameras(false)
			}
		}

		room.on(RoomEvent.LocalTrackPublished, updateCameraAvailability)
		room.on(RoomEvent.LocalTrackUnpublished, updateCameraAvailability)
		room.on(RoomEvent.TrackMuted, updateCameraAvailability)
		room.on(RoomEvent.TrackUnmuted, updateCameraAvailability)
		navigator.mediaDevices?.addEventListener('devicechange', updateCameraAvailability)
		void updateCameraAvailability()

		return () => {
			isMounted = false
			room.off(RoomEvent.LocalTrackPublished, updateCameraAvailability)
			room.off(RoomEvent.LocalTrackUnpublished, updateCameraAvailability)
			room.off(RoomEvent.TrackMuted, updateCameraAvailability)
			room.off(RoomEvent.TrackUnmuted, updateCameraAvailability)
			navigator.mediaDevices?.removeEventListener('devicechange', updateCameraAvailability)
		}
	}, [room, type])

	if (type === 'cameraSwitch') {
		if (!hasMultipleCameras) return null

		return (
			<button
				type='button'
				aria-label={option.label}
				onClick={async () => {
					const cameraTrack = room.localParticipant.getTrackPublication(
						Track.Source.Camera,
					)?.track
					if (!cameraTrack) return

					const nextFacingMode = facingMode === 'user' ? 'environment' : 'user'
					try {
						await cameraTrack.restartTrack({ facingMode: nextFacingMode })
						setFacingMode(nextFacingMode)
					} catch (error) {
						console.error('Failed to switch camera:', error)
					}
				}}
				className={buttonClassName}
			>
				<Icon size={18} strokeWidth={2} />
			</button>
		)
	}

	if (type === 'microphone' || type === 'camera') {
		return (
			<TrackToggle
				type='button'
				source={
					type === 'microphone' ? Track.Source.Microphone : Track.Source.Camera
				}
				showIcon={false}
				aria-label={option.label}
				className={buttonClassName}
				onChange={setEnabled}
			>
				<Icon size={18} strokeWidth={2} />
			</TrackToggle>
		)
	}

	if (type === 'shareScreen') {
		return (
			<TrackToggle
				type='button'
				source={
					Track.Source.ScreenShare
				}
				showIcon={false}
				aria-label={option.label}
				className={buttonClassName}
				onChange={setEnabled}
			>
				<Icon size={18} strokeWidth={2} />
			</TrackToggle>
		)
	}

	if (type === 'volume') {
		return (
			<button
				type='button'
				aria-label={option.label}
				aria-pressed={enabled}
				onClick={() => setEnabled(value => !value)}
				className={buttonClassName}
			>
				<Icon size={18} strokeWidth={2} />
			</button>
		)
	}

	return (
		<button
			type='button'
			aria-label={option.label}
			onClick={() => {
				disconnect()
				navigate(-1)
			}}
			className={buttonClassName}
		>
			<Icon size={20} strokeWidth={2} />
		</button>
	)
}
