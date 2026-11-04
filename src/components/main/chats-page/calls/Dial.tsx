import { Mic, MicOff, Phone, Volume2, VolumeX } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

type DialType = 'volume' | 'microphone' | 'endCall'

const dialOptions = {
	volume: { label: 'Toggle speaker', on: Volume2, off: VolumeX },
	microphone: { label: 'Toggle microphone', on: Mic, off: MicOff },
	endCall: { label: 'End call', on: Phone, off: Phone },
}

export default function Dial({ type }: { type: DialType }) {
	const [enabled, setEnabled] = useState(true)
	const option = dialOptions[type]
	const Icon = enabled ? option.on : option.off
	const isEndCall = type === 'endCall'

	const navigate = useNavigate()

	return (
		<button
			type='button'
			aria-label={option.label}
			aria-pressed={isEndCall ? undefined : enabled}
			onClick={() => {
				if (isEndCall) {
					navigate(-1)
				} else {
					setEnabled(value => !value)
				}
			}}
			className={`flex cursor-pointer ${ isEndCall ? 'size-13' : 'size-12' } shrink-0 items-center justify-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500 dark:focus-visible:outline-white ${
				isEndCall
					? 'bg-[#FB2C36] text-white hover:bg-[#e9232d]'
					: 'bg-[#EBEBF0] text-[#111118] hover:bg-[#dedee5] dark:bg-[#202027] dark:text-white dark:hover:bg-[#2b2b34]'
			}`}
		>
			<Icon size={isEndCall ? 20 : 18} strokeWidth={2} />
		</button>
	)
}
