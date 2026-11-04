export default function Badge({text , noMargin}: {text: string, noMargin?: boolean}) {
	return (
		<div className={`text-[#7C5CFC] bg-[#7C5CFC]/10 font-mono shrink-0 rounded-md font-light px-2 ${noMargin ? 'mr-0' : 'mr-2'} text-sm md:text-md`}>{text}</div>
	)
}
