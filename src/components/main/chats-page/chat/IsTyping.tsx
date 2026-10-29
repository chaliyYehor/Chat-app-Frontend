import { useGSAP } from '@gsap/react'
import clsx from 'clsx'
import gsap from 'gsap'
import { User } from 'lucide-react'
import { useRef } from 'react'
import { getDisplayedStatus } from '../../../../lib/getDisplayedStatus'
import type { GetUserInfoChat } from '../../../../schemas/main/getUserInfoChat'

export default function IsTyping({
	userInfo,
	isTyping,
}: {
	userInfo: GetUserInfoChat
	isTyping: boolean
}) {
	const containerRef = useRef<HTMLDivElement>(null)

	useGSAP(
		() => {
			const container = containerRef.current
			if (!container) return

			if (isTyping) {
				gsap.fromTo(
					container,
					{ height: 0, autoAlpha: 0, marginTop: 0 },
					{
						height: 'auto',
						autoAlpha: 1,
						marginTop: 16,
						duration: 0.3,
						ease: 'power2.out',
						overwrite: 'auto',
					},
				)
			} else {
				gsap.to(container, {
					height: 0,
					autoAlpha: 0,
					marginTop: 0,
					duration: 0.25,
					ease: 'power2.in',
					overwrite: 'auto',
				})
			}
		},
		{ dependencies: [isTyping], scope: containerRef },
	)

	const colors = {
		online: { text: '#00D4AA', bg: '#00D4AA' },
		away: { text: '#F59E0B', bg: '#F59E0B' },
		offline: { text: '#6B6B80', bg: '#6B6B80' },
	}
	return (
		<>
			<div
				ref={containerRef}
				role='status'
				aria-live='polite'
				aria-atomic='true'
				aria-hidden={!isTyping}
				className={clsx('justify-start w-full flex message relative shrink-0 overflow-hidden')}
			>
				<div className='md:max-w-[70%] max-w-[90%] min-w-0 flex relative gap-2'>
					<>
						<div
							className={`sticky bottom-0 self-end w-10 h-10 rounded-[50%] dark:text-white text-black flex justify-center items-center border-2 border-gray-700 shrink-0`.trim()}
						>
							{userInfo?.imageUrl ? (
								<div className='w-full h-full flex justify-center items-center overflow-hidden rounded-[50%]'>
									<img
										className='w-full max-h-60 lg:max-h-120 object-cover'
										src={userInfo.imageUrl}
										alt={`Profile picture of ${userInfo.name}`}
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
						</div>
					</>
						<div className='w-15 px-4 py-3 rounded-2xl rounded-bl-sm dark:bg-[#1E1E26] bg-[#EBEBF0] flex justify-center items-center rounded-e-3xl'>
						<span className='sr-only'>{userInfo.name} is typing</span>
						<div className='typingIndicator' aria-hidden='true' />
					</div>
				</div>
			</div>
		</>
	)
}
