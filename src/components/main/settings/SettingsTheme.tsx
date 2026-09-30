import { Sun } from 'lucide-react'
import ThemeSwitch from './ThemeSwitch'

export default function SettingsTheme() {
	return (
		<>
			<div className='outline mx-4 mb-4 dark:outline-white/7 outline-black/10  rounded-2xl flex flex-col'>
				<div className='flex border-b items-center border-white/7 w-full h-full p-4'>
					<div className='flex-1 flex items-center gap-1'>
						<Sun size={18} color='#6B6B80' />
						<span className='dark:text-white ml-2 font-medium font-inter'>Theme</span>
					</div>
					<div className='self-end'><ThemeSwitch /></div>
				</div>
			</div>
		</>
	)
}
