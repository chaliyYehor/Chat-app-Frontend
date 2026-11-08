import { TrackToggle, useRoomContext } from '@livekit/components-react'
import { Track } from 'livekit-client'
import {
	Mic,
	MicOff,
	Phone,
	ScreenShare,
	ScreenShareOff,
	Video,
	VideoOff,
	Volume2,
	VolumeX,
} from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

type DialType = 'volume' | 'microphone' | 'endCall' | 'camera' | 'shareScreen'

const dialOptions = {
	volume: { label: 'Toggle speaker', on: Volume2, off: VolumeX },
	microphone: { label: 'Toggle microphone', on: Mic, off: MicOff },
	camera: { label: 'Toggle camera', on: Video, off: VideoOff },
	shareScreen: { label: 'Share screen', on: ScreenShareOff, off: ScreenShare },
	endCall: { label: 'End call', on: Phone, off: Phone },
}

export default function Dial({ type }: { type: DialType }) {
	const room = useRoomContext()

	const [enabled, setEnabled] = useState(true)
	const option = dialOptions[type]
	const Icon = enabled ? option.on : option.off
	const isEndCall = type === 'endCall'

	function disconnect() {
		room.disconnect()
	}

	const navigate = useNavigate()
	const buttonClassName = `flex cursor-pointer ${isEndCall ? 'size-13' : 'size-12'} shrink-0 items-center justify-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500 dark:focus-visible:outline-white ${
		isEndCall
			? 'bg-[#FB2C36] text-white hover:bg-[#e9232d]'
			: 'bg-[#EBEBF0] text-[#111118] hover:bg-[#dedee5] dark:bg-[#202027] dark:text-white dark:hover:bg-[#2b2b34]'
	}`

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
