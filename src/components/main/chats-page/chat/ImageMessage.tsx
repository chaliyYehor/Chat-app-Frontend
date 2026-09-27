import clsx from 'clsx'
import { useState } from 'react'
import ViewImage from './ViewImage'
import RightClick from './RightClick'

export default function ImageMessage({ isMe = true, isGroup = false }: { isMe: boolean; isGroup?: boolean }) {
	const [isPreviewOpen, setIsPreviewOpen] = useState(false)

	const [toolsPosition, setToolsPosition] = useState<{
		x: number
		y: number
	} | null>(null)

	function handleContextMenu(e: React.MouseEvent) {
		e.preventDefault()
		e.stopPropagation()
		setToolsPosition({ x: e.clientX, y: e.clientY })
	}

	return (
		<>
			{isPreviewOpen && (
				<ViewImage
					src='/rozvrh3.png'
					alt='Preview'
					setShowPreview={setIsPreviewOpen}
				/>
			)}
			<div
				className={clsx(
					isMe ? 'justify-end' : 'justify-start',
					'w-full flex message',
				)}
				onContextMenu={handleContextMenu}
			>
				{toolsPosition && (
					<RightClick
						position={toolsPosition}
						onClose={() => setToolsPosition(null)}
					/>
				)}
				<div className='max-w-[70%] min-w-0 flex relative gap-2'>
					{!isMe && (
						<div
							className={`sticky bottom-0 self-end w-10 h-10 rounded-[50%] text-white flex justify-center items-center border-2 border-gray-700 shrink-0`.trim()}
						>
							PFP
							<div className='w-3 h-3 bg-green-500 border border-white rounded-[50%] absolute right-0 top-[68%]' />
						</div>
					)}
					<div className='flex-1 min-w-0 flex flex-col'>
						{!isMe && isGroup && (
							<p className='text-[#6B6B80] text-[12px] font-medium font-inter ml-2 mb-1'>
								Priya Nair
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
							<button
								className='w-full max-h-120 cursor-pointer'
								onClick={() => {
									setIsPreviewOpen(true)
								}}
							>
								<img
									className='w-full max-h-60 lg:max-h-120 object-cover'
									src='/rozvrh.png'
									alt=''
								/>
							</button>
						</div>
						<p
							className={clsx(
								isMe ? 'self-end' : 'self-start',
								'text-[#6B6B80] text-[13px] font-mono ml-1',
							)}
						>
							When
						</p>
					</div>
				</div>
			</div>
		</>
	)
}
