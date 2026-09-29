export default function UIArrowRight({ isDanger }: { isDanger?: boolean }) {
	return (
		<span
			style={{ color: isDanger ? '#EF4444' : '#6B6B80' }}
			className=' font-semibold font-mono shrink-0'
		>
			{'>'}
		</span>
	)
}
