import { Link } from 'react-router-dom'
import { PhoneIncoming, PhoneOutgoing, Users, Video } from 'lucide-react'
import Avatar from '../../Avatar'
import GroupPfp from '../groups/GroupPfp'
import { useSelector } from 'react-redux'
import type { RootType } from '../../../../store/store'
import type { PreviousCall } from '../../../../schemas/main/getPreviousCallsResponse'

export default function CallsPreview({ callInfo }: { callInfo: PreviousCall }) {
	const appTheme = useSelector((state: RootType) => state.theme.mode)
	const isGroup = callInfo.groupId !== null
	const isIncoming = callInfo.currentUser.role !== 'initiator'
	const isMissed = callInfo.currentUser.status === 'missed'
	const isDeclined = callInfo.currentUser.status === 'declined'
	const otherParticipants = callInfo.participants.filter(
		participant => participant.userId !== callInfo.currentUser.userId,
	)
	const directOtherParticipant =
		otherParticipants[0] ??
		callInfo.participants.find(
			participant => participant.role !== callInfo.currentUser.role,
		)
	const title = isGroup
		? callInfo.group?.name || 'Group call'
		: directOtherParticipant?.name || 'Unknown user'
	const callLabel = isMissed ? 'Missed' : isDeclined ? 'Declined' : isIncoming ? 'Incoming' : 'Outgoing'
	const CallIcon = isGroup
		? Users
		: callInfo.callType === 'video'
			? Video
			: isIncoming
				? PhoneIncoming
				: PhoneOutgoing
	const callColor = isMissed || isDeclined
		? '#FF6467'
		: isIncoming
			? '#00D4AA'
			: '#6B6B80'
	const groupParticipants = otherParticipants.map(participant => participant.name)
	const durationSeconds = callInfo.endedAt && !isMissed && !isDeclined
		? Math.max(0, Math.floor((callInfo.endedAt.getTime() - callInfo.startedAt.getTime()) / 1000))
		: null
	const duration = durationSeconds === null
		? null
		: `${String(Math.floor(durationSeconds / 60)).padStart(2, '0')}:${String(durationSeconds % 60).padStart(2, '0')}`
	const formatCallDate = (date: Date) => {
		const today = new Date()
		const isToday = date.toDateString() === today.toDateString()
		const yesterday = new Date(today)
		yesterday.setDate(today.getDate() - 1)
		if (isToday) return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
		if (date.toDateString() === yesterday.toDateString()) return 'Yesterday'
		return date.toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric' })
	}

	return (
		<div className='w-full min-h-18 flex items-center gap-3 rounded-lg px-2 py-2 transition-colors dark:hover:bg-[#1e1e26] hover:bg-[#f0f0f4]'>
			<Link
				to={isGroup ? `/groups/${callInfo.groupId}` : `/chats/${callInfo.conversationId}`}
				className='flex min-w-0 flex-1 items-center gap-3'
			>
				{isGroup ? (
					<GroupPfp groupName={title} />
				) : (
					<Avatar isMe state='offline' imageUrl={directOtherParticipant?.imageUrl ?? undefined} />
				)}
				<div className='flex min-w-0 flex-1 flex-col gap-1'>
					<p className={`truncate font-semibold text-[16px] sm:text-[18px] ${isMissed || isDeclined ? 'text-[#FF6467]' : appTheme === 'dark' ? 'text-white' : 'text-[#333]'}`}>
						{title}
					</p>
					<p className='flex items-center gap-1 text-xs font-mono text-[#6B6B80]'>
						<CallIcon size={14} color={callColor} />
						<span>{callLabel}</span>
						<span aria-hidden='true'>·</span>
						<span>{callInfo.callType === 'video' ? 'Video' : 'Audio'}</span>
						{duration && <><span aria-hidden='true'>·</span><span>{duration}</span></>}
					</p>
					{isGroup && (
						<p className='truncate text-xs font-mono text-[#6B6B80]'>
							{groupParticipants.length > 0 ? groupParticipants.join(', ') : 'No other participants'}
						</p>
					)}
				</div>
			</Link>
			<div className='flex shrink-0 flex-col items-end gap-1'>
				<time dateTime={callInfo.startedAt.toISOString()} className='text-right text-[11px] sm:text-xs font-mono text-[#6B6B80]'>
					{formatCallDate(callInfo.startedAt)}
				</time>
			</div>
		</div>
	)
}
