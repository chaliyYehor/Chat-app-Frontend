export default function Label({
	text,
	htmlFor,
}: {
	text: string
	htmlFor: string
}) {
	return (
		<label htmlFor={htmlFor} className='text-[#6B6B80] text-sm mb-1 block'>
			{text}
		</label>
	)
}
