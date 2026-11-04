export default function CallBadge({text}: {text?: string}) {
	return (
		<div className='font-mono rounded-full border border-[#000000]/8 dark:border-white/7 dark:bg-[#16161B] p-2 text-[12px] py-1 bg-[#FFFFFF] letter-spacing-[0.5px] shadow-md'>
			<span className='text-[#6B6B80] uppercase select-none text-shadow-2xs'>{text}</span>
		</div>
	)
}
