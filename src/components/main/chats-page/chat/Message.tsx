import clsx from 'clsx'
import { Check, CheckCheck, User } from 'lucide-react'
import { useState } from 'react'
import UserInfo from '../../UserInfo'
import RightClick from './RightClick'
import ViewImage from './ViewImage'
import type { RootType } from '../../../../store/store'
import { useSelector } from 'react-redux'
import type { Message } from '../../../../schemas/main/messages'
import type { GetUserInfoChat } from '../../../../schemas/main/getUserInfoChat'
import { getDisplayedStatus } from '../../../../lib/getDisplayedStatus'

export default function Message({
	isMe = true,
	isGroup = false,
	messageInfo,
	userInfo,
	isFetching,
	chatId
}: {
	isMe: boolean
	isGroup?: boolean
	imageUrl?: string
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

	function handleContextMenu(e: React.MouseEvent) {
		e.preventDefault()
		e.stopPropagation()
		setToolsPosition({ x: e.clientX, y: e.clientY })
	}

	const appTheme = useSelector((state: RootType) => state.theme.mode)

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
					userInfo={userInfo}
				/>
			)}
			<div
				className={clsx(
					isMe ? 'justify-end' : 'justify-start',
					'w-full flex message relative',
				)}
				onContextMenu={handleContextMenu}
			>
				{toolsPosition && (
					<RightClick
						position={toolsPosition}
						onClose={() => setToolsPosition(null)}
						isMe={isMe}
						messageText={messageInfo.text ?? null}
						chatId={chatId}
						messageId={messageInfo.id}
					/>
				)}
				<div className='md:max-w-[70%] max-w-[90%] min-w-0 flex relative gap-2'>
					{!isMe && (
						<>
							<button
								type='button'
								onClick={() => setIsProfileOpen(true)}
								aria-label='Open sender profile'
								className={`cursor-pointer sticky bottom-0 self-end w-10 h-10 rounded-[50%] dark:text-white text-black flex justify-center items-center border-2 border-gray-700 shrink-0`.trim()}
							>
								{userInfo?.imageUrl ? (
									<div className='w-full h-full flex justify-center items-center overflow-hidden rounded-[50%]'>
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
										backgroundColor: colors[getDisplayedStatus(
											userInfo?.status,
											userInfo?.previouslySetStatus,
										)].bg,
									}}
									className='w-3 h-3 border border-white rounded-[50%] absolute right-0 top-[68%]'
								/>
							</button>
						</>
					)}
					<div className='flex-1 min-w-0 flex flex-col'>
						{!isMe && isGroup && (
							<p className='text-[#6B6B80] text-[12px] font-medium font-inter ml-2 mb-1'>
								{userInfo?.name}
							</p>
						)}
						<div
							className={clsx(
								isMe
									? 'rounded-br-sm myMessage'
									: 'rounded-bl-sm dark:bg-[#1E1E26] bg-[#EBEBF0] border border-gray-600',
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

							<p
								style={{
									color: isMe
										? 'white'
										: appTheme === 'dark'
											? 'white'
											: 'black',
								}}
								className={
									'message-text font-inter px-3.5 py-2 md:text-sm text-base leading-relaxed wrap-anywhere whitespace-pre-wrap'
								}
							>
								{messageInfo.text}
							</p>
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
							{!isGroup && messageInfo.read && isMe && (
								<CheckCheck color='#7c5cfc' size={13} />
							)}
							{!isGroup && !messageInfo.read && isMe && (
								<Check color='#6B6B80' size={13} />
							)}
						</p>
					</div>
				</div>
			</div>
		</>
	)
}
