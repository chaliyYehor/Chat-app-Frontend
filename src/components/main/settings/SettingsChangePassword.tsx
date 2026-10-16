import { SquarePen } from 'lucide-react'
import UIArrowRight from './UIArrowRight'
import type { RootType } from '../../../store/store'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function SettingsChangePassword() {
	const items = [
		{
			icon: SquarePen,
			label: 'Change Password',
		},
	]

	const appTheme = useSelector((state: RootType) => state.theme.mode)
	return (
		<>
			<div className='outline mx-4 mb-4 dark:outline-white/7 outline-black/10  rounded-2xl flex flex-col overflow-hidden'>
				{items.map((item, index) => (
					<Link
						to='/settings/changePassword'
						key={index}
						style={{
							borderBottom:
								index !== items.length - 1 && appTheme === 'dark'
									? '1px solid rgba(255, 255, 255, 0.07)'
									: index !== items.length - 1
										? '1px solid rgba(0, 0, 0, 0.07)'
										: 'none',
						}}
						className={`flex border-b items-center border-white/7 w-full h-full p-4 text-left transition-colors cursor-pointer ${'hover:bg-[#7C5CFC]/10'}`}
					>
						<div className='flex-1 flex items-center gap-1'>
							<item.icon size={18} color={'#6B6B80'} />
							<div className='flex flex-col'>
								<span
									className='ml-2 font-medium font-inter dark:text-white'
								>
									{item.label}
								</span>
							</div>
						</div>
						<UIArrowRight />
					</Link>
				))}
			</div>
		</>
	)
}
