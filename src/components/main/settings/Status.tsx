export default function Status({
	status,
}: {
	status: 'online' | 'away' | 'offline'
}) {
	const colors = {
		online: { text: '#00D4AA', bg: '#00D4AA' },
		away: { text: '#F59E0B', bg: '#F59E0B' },
		offline: { text: '#6B6B80', bg: '#6B6B80' },
	}

	return (
		<div
			style={{
				color: colors[status].text,
				backgroundColor: `color-mix(in oklab, ${colors[status].bg} 15%, transparent)`,
			}}
			className='capitalize flex justify-center items-center gap-1 rounded-full text-[11px] font-medium font-inter p-1 max-w-15 h-5'
		>
			<span
				style={{
					backgroundColor: colors[status].bg,
				}}
				className='w-1.5 h-1.5 rounded-full'
			/>
			{status}
		</div>
	)
}
