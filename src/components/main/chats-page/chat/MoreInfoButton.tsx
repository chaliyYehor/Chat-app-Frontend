import { Button } from '@mui/material'
import { EllipsisVertical } from 'lucide-react'
import { useState } from 'react'
import MoreInfoRightClick from './MoreInfoRightClick'

export default function MoreInfoButton({
	isGroup = false,
}: {
	isGroup?: boolean
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
					position={chatToolsPosition}
					onClose={() => setChatToolsPosition(null)}
					isGroup={isGroup}
				/>
			)}
			<Button
				onClick={handleClick}
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
				<EllipsisVertical />
			</Button>
		</>
	)
}
