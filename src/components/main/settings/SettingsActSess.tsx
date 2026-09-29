import { Monitor, Smartphone, Ellipsis } from 'lucide-react'
import SettingsSwitch from './SettingsSwitch'

export default function SettingsActSess() {
	const items = [
		{
			icon: Monitor,
			label: 'Read Receipts',
			moreInfo: 'San Francisco, CA · Now',
		},
		{
			icon: Smartphone,
			label: 'Last Seen',
			moreInfo: 'San Francisco, CA · 2h ago',
		},
		{
			icon: Ellipsis,
			label: 'Last Seen',
			moreInfo: 'New York, NY · 3 days ago',
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
							<div className='flex flex-col'>
								<span className='text-white ml-2 font-medium font-inter'>
									{item.label}
								</span>
								{item.moreInfo && (
									<span className='text-[#6B6B80] text-sm ml-2 font-inter font-normal'>
										{item.moreInfo}
									</span>
								)}
							</div>
						</div>
						<button
							type='button'
							className='text-[#FF6467] text-sm hover:text-red-300 trransition-colors shrink-0 font-inter font-semibold cursor-pointer'
						>
							Revoke
						</button>
					</div>
				))}
			</div>
		</>
	)
}
