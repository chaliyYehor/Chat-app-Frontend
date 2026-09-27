import { Link } from 'react-router-dom'
import Avatar from '../../Avatar'
import { Video, PhoneOutgoing, PhoneIncoming, Users } from 'lucide-react'
import CallButon from '../chat/CallButton'
import VideoCallBtn from '../chat/VideoCallBtn'

interface CallsPreviewProps {
	isIncoming: boolean
	isVideoCall: boolean
	missed?: boolean
	groupUsers?: string[]
}

export default function CallsPreview({
	isIncoming,
	isVideoCall,
	missed,
	groupUsers,
}: CallsPreviewProps) {
	const items = {
		isIncoming: {
			icon: isVideoCall ? Video : PhoneIncoming,
			color: missed ? '#FF6467' : '#00D4AA',
			label: missed ? 'Missed' : 'Incoming',
		},
		isOutgoing: {
			icon: isVideoCall ? Video : PhoneOutgoing,
			color: '#6B6B80',
			label: 'Outgoing',
		},
		isGroup: {
			icon: Users,
			color:
				isIncoming && missed ? '#FF6467' : isIncoming ? '#00D4AA' : '#6B6B80',
			label: missed ? 'Missed' : isIncoming ? 'Incoming' : 'Outgoing',
		},
	}

	const itemsToDisplay = groupUsers
		? items.isGroup
		: !groupUsers && isIncoming
			? items.isIncoming
			: !groupUsers && !isIncoming
				? items.isOutgoing
				: null

	const IconComponent = itemsToDisplay ? itemsToDisplay.icon : null
	return (
		<Link
			to={'#'}
			style={{
				padding: '0',
			}}
			className='chatPreview w-full h-17.5 flex justify-center items-center gap-3 hover:bg-[#1e1e26] rounded-lg transition-all duration-200 ease-in-out'
		>
			<Avatar />
			<div className='flex-1 min-w-0 flex flex-col gap-1 items-start text-white'>
				<p
					style={{ color: missed ? '#FF6467' : 'white' }}
					className='truncate max-w-[60%] font-semibold text-[18px]'
				>
					Sofia Chen
				</p>
				<p className='text-[#6B6B80] text-sm font-mono text-[12px] flex justify-center items-center gap-1'>
					{IconComponent && (
						<>
							<IconComponent size={15} color={itemsToDisplay?.color} />
							{itemsToDisplay?.label} · 24:13
						</>
					)}
				</p>
				{groupUsers && (
					<p className='text-[#6B6B80] text-sm font-mono text-[12px] max-w-[60%] truncate'>
						{groupUsers.join(', ')}
					</p>
				)}
			</div>
			<div className='flex flex-col justify-between items-center gap-1'>
				<p className='text-[#6B6B80] self-end text-sm font-mono text-[12px] flex justify-center items-center gap-1'>
					Today
				</p>
				<div className='flex justify-center items-center gap-2 mt-1'>
					<CallButon size={18} />
					<VideoCallBtn size={18} />
				</div>
			</div>
		</Link>
	)
}
