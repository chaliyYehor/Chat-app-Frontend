import { useSelector } from 'react-redux'
import type { RootType } from '../../../../store/store'

export default function CallBadge({text}: {text?: string}) {
	const appTheme = useSelector((state: RootType) => state.theme.mode)
	return (
		<div style={{
			backgroundColor: text === 'Video Call' ? '#00000084' : appTheme === 'dark' ? '#16161B' : '#FFFFFF',
			color: text === 'Video Call' ? '#FFFFFF' : appTheme === 'dark' ? '#FFFFFF' : '#000000',
		}} className='font-mono whitespace-nowrap rounded-full border border-[#000000]/8 dark:border-white/7 dark:bg-[#16161B] p-2 text-[10px] sm:text-[12px] py-1 bg-[#FFFFFF] letter-spacing-[0.5px] shadow-md'>
			<span className='uppercase select-none text-shadow-2xs'>{text}</span>
		</div>
	)
}
