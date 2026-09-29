import { MessageCircleMore, Volume2 } from 'lucide-react'
import SettingsSwitch from './SettingsSwitch'

export default function SettingsSounds() {
	const items = [
		{
			icon: MessageCircleMore,
			label: 'Typing Sound',
		},
		{
			icon: Volume2,
			label: 'Message Sound',
		},
	]
	return (
		<>
			<div className='outline mx-4 mb-4 outline-white/7  rounded-2xl flex flex-col'>
				{items.map((item, index) => (
					<div
						key={index}
						style={{
							borderBottom:
								index !== items.length - 1
									? '1px solid rgba(255, 255, 255, 0.07)'
									: 'none',
						}}
						className='flex border-b items-center border-white/7 w-full h-full p-4'
					>
						<div className='flex-1 flex items-center gap-1'>
							<item.icon size={18} color='#6B6B80' />
							<span className='text-white ml-2 font-medium font-inter'>
								{item.label}
							</span>
						</div>
						<div className='self-end'>
							<SettingsSwitch />
						</div>
					</div>
				))}
			</div>
		</>
	)
}
