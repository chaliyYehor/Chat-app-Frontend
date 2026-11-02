export default function Badge({text}: {text: string}) {
	return (
		<div className='text-[#7C5CFC] bg-[#7C5CFC]/10 font-mono shrink-0 rounded-md font-light px-2 mr-2 text-sm md:text-md'>{text}</div>
	)
}
