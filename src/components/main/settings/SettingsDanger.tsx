import { Trash } from 'lucide-react'
import UIArrowRight from './UIArrowRight'

export default function SettingsDanger() {
	const items = [
		{
			icon: Trash,
			label: 'Delete Account',
			danger: true,
			isLink: false,
			moreInfo: 'Permanently remove all your data'
		},
	]
	return (
		<>
			<div className='outline mx-4 mb-4 dark:outline-white/7 outline-black/10  rounded-2xl flex flex-col overflow-hidden'>
				{items.map((item, index) => (
					<button
						key={index}
						style={{
							borderBottom:
								index !== items.length - 1
									? '1px solid rgba(255, 255, 255, 0.07)'
									: 'none',
						}}
						className={`flex border-b items-center border-white/7 w-full h-full p-4 text-left transition-colors cursor-pointer ${
							item.danger ? 'hover:bg-red-500/10' : 'hover:bg-[#7C5CFC]/10'
						}`}
					>
						<div className='flex-1 flex items-center gap-1'>
							<item.icon
								size={18}
								color={item.danger ? '#EF4444' : '#6B6B80'}
							/>
							<div className='flex flex-col'>
								<span
									style={{ color: item.danger ? '#EF4444' : '#FFFFFF' }}
									className='ml-2 font-medium font-inter'
								>
									{item.label}
								</span>
								{item.moreInfo && (
									<span className='text-[#6B6B80] text-sm ml-2 font-inter font-normal'>
										{item.moreInfo}
									</span>
								)}
							</div>
						</div>
						{item.danger && <UIArrowRight isDanger={item.danger} />}
					</button>
				))}
			</div>
		</>
	)
}
