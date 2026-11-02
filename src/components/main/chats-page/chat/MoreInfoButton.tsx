import { Button } from '@mui/material'
import { EllipsisVertical } from 'lucide-react'
import { useState, type SetStateAction } from 'react'
import MoreInfoRightClick from './MoreInfoRightClick'

export default function MoreInfoButton({
	isGroup = false,
	chatId,
	isPinned,
	onSearchClick,
	messagesLength,
	isAdmin
}: {
	isGroup?: boolean
	chatId: string
	isPinned: boolean
	isAdmin?: boolean
	messagesLength?: number
	onSearchClick: (value: SetStateAction<boolean>) => void
}) {
	const [chatToolsPosition, setChatToolsPosition] = useState<{
		x: number
		y: number
	} | null>(null)

	function handleClick(e: React.MouseEvent) {
		e.preventDefault()
		e.stopPropagation()
		setChatToolsPosition({ x: e.clientX, y: e.clientY })
	}
	return (
		<>
			{chatToolsPosition && (
				<MoreInfoRightClick
					isAdmin={isAdmin}
					messagesLength={messagesLength}
					chatId={chatId}
					isPinned={isPinned}
					onSearchClick={onSearchClick}
					position={chatToolsPosition}
					onClose={() => setChatToolsPosition(null)}
					isGroup={isGroup}
				/>
			)}
			<Button
				type='button'
				onClick={handleClick}
				aria-label='More conversation options'
				sx={{
					width: '50px',
					minWidth: '0',
					height: '50px',
					borderRadius: '10px',
					fontSize: '1rem',
					textTransform: 'none',
					color: '#6B6B80',
					borderColor: '#333',
					transition: 'all 0.2s ease-in-out',

					'&:hover': {
						backgroundColor: '#1f1f26',
						borderColor: '#444',
						color: '#eee',
					},
				}}
			>
				<EllipsisVertical aria-hidden='true' />
			</Button>
		</>
	)
}
