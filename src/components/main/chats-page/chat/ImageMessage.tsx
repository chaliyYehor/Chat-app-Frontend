import clsx from 'clsx'
import { Check, CheckCheck, User } from 'lucide-react'
import { useRef, useState } from 'react'
import RightClick from './RightClick'
import ViewImage from './ViewImage'
import type { Message } from '../../../../schemas/main/messages'
import type { GetUserInfoChat } from '../../../../schemas/main/getUserInfoChat'
import UserInfo from '../../UserInfo'
import { getDisplayedStatus } from '../../../../lib/getDisplayedStatus'

export default function ImageMessage({
	isMe = true,
	isGroup = false,
	isSeen,
	messageInfo,
	userInfo,
	isFetching,
	chatId,
}: {
	isMe: boolean
	isGroup?: boolean
	isSeen?: boolean
	messageInfo: Message
	userInfo: GetUserInfoChat
	isFetching: boolean
	chatId: string
}) {
	const colors = {
		online: { text: '#00D4AA', bg: '#00D4AA' },
		away: { text: '#F59E0B', bg: '#F59E0B' },
		offline: { text: '#6B6B80', bg: '#6B6B80' },
	}

	const [isPreviewOpen, setIsPreviewOpen] = useState(false)

	const [isProfileOpen, setIsProfileOpen] = useState(false)

	const [toolsPosition, setToolsPosition] = useState<{
		x: number
		y: number
	} | null>(null)
	const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
	const longPressTriggered = useRef(false)

	function handleContextMenu(e: React.MouseEvent) {
		e.preventDefault()
		e.stopPropagation()
		setToolsPosition({ x: e.clientX, y: e.clientY })
	}

	function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
		if (e.pointerType !== 'touch' || !isMe) return

		longPressTriggered.current = false
		const { clientX, clientY } = e
		longPressTimer.current = setTimeout(() => {
			longPressTriggered.current = true
			setToolsPosition({ x: clientX, y: clientY })
		}, 500)
	}

	function cancelLongPress() {
		if (longPressTimer.current) {
			clearTimeout(longPressTimer.current)
			longPressTimer.current = null
		}
	}

	return (
		<>
			{isPreviewOpen && messageInfo.imageUrl && (
				<ViewImage
					src={messageInfo.imageUrl}
					alt='Preview'
					setShowPreview={setIsPreviewOpen}
				/>
			)}
			{isProfileOpen && (
				<UserInfo
					setIsProfileOpened={setIsProfileOpen}
					isYourProfile={isMe}
					isFetching={isFetching}
					sharedMedia={true}
					isGroup={isGroup}
					userInfo={userInfo}
					chatId={chatId}
				/>
			)}
			<div
				className={clsx(
					isMe ? 'justify-end' : 'justify-start',
					'w-full flex message',
				)}
				onContextMenu={isMe ? handleContextMenu : undefined}
				onPointerDown={handlePointerDown}
				onPointerUp={cancelLongPress}
				onPointerCancel={cancelLongPress}
				onPointerLeave={cancelLongPress}
				onClick={e => {
					if (longPressTriggered.current) {
						e.preventDefault()
						e.stopPropagation()
						longPressTriggered.current = false
					}
				}}
			>
				{toolsPosition && (
					<RightClick
						isGroup={isGroup}
						groupId={messageInfo.groupId ?? ''}
						position={toolsPosition}
						isMe={isMe}
						onClose={() => setToolsPosition(null)}
						messageText={messageInfo.text ?? null}
						chatId={chatId}
						messageId={messageInfo.id}
					/>
				)}
				<div className='md:max-w-[70%] max-w-[90%] min-w-0 flex relative gap-2'>
					{!isMe && (
						<button
							type='button'
							onClick={() => setIsProfileOpen(true)}
							aria-label='Open sender profile'
							className={`cursor-pointer sticky bottom-0 self-end w-10 h-10 rounded-[50%] dark:text-white text-black flex justify-center items-center border-2 border-gray-700 shrink-0`.trim()}
						>
							{userInfo?.imageUrl ? (
								<div className='w-full h-full overflow-hidden rounded-[50%] flex justify-center items-center'>
									<img
										className='w-full max-h-60 lg:max-h-120 object-cover'
										src={userInfo.imageUrl}
										alt='Profile picture'
									/>
								</div>
							) : (
								<div className='w-full h-full flex items-center justify-center'>
									<User />
								</div>
							)}
							<div
								style={{
									backgroundColor:
										colors[
											getDisplayedStatus(
												userInfo?.status,
												userInfo?.previouslySetStatus,
											)
										].bg,
								}}
								className='w-3 h-3 border border-white rounded-[50%] absolute right-0 top-[68%]'
							/>
						</button>
					)}
					<div className='flex-1 min-w-0 flex flex-col'>
						{!isMe && isGroup && (
							<p
								translate='no'
								className='text-[#6B6B80] text-[12px] font-medium font-inter ml-2 mb-0.5'
							>
								{userInfo?.name}
							</p>
						)}
						<div
							className={clsx(
								isMe
									? 'rounded-br-sm myMessage'
									: 'rounded-bl-sm bg-[#1E1E26] border border-gray-600',
								'rounded-2xl overflow-hidden',
							)}
						>
							{messageInfo.imageUrl && (
								<button
									type='button'
									className='w-full max-h-120 cursor-pointer'
									aria-label='Open image preview'
									onClick={() => {
										setIsPreviewOpen(true)
									}}
								>
									<img
										className='w-full max-h-60 lg:max-h-120 object-cover'
										src={messageInfo.imageUrl}
										alt='Picture'
									/>
								</button>
							)}
						</div>
						<p
							className={clsx(
								isMe ? 'self-end' : 'self-start',
								'text-[#6B6B80] md:text-[13px] text-[15px] font-mono ml-1 flex justify-center items-center gap-1',
							)}
						>
							<span>
								{messageInfo.createdAt.toLocaleTimeString([], {
									hour: '2-digit',
									minute: '2-digit',
								})}
							</span>
							{!isGroup && isSeen && isMe && (
								<CheckCheck color='#7c5cfc' size={13} />
							)}
							{!isGroup && !isSeen && isMe && (
								<Check color='#6B6B80' size={13} />
							)}
						</p>
					</div>
				</div>
			</div>
		</>
	)
}
