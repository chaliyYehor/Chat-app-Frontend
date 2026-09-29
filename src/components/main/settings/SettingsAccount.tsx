import { CircleQuestionMark, LogOut, Shield, User } from 'lucide-react'
import UIArrowRight from './UIArrowRight'
import { Link } from 'react-router-dom'

export default function SettingsAccount() {
	const items = [
		{
			icon: User,
			label: 'Edit Profile',
			moreInfo: 'Name, bio, photo, status',
			link: 'editProfile',
		},
		{
			icon: Shield,
			label: 'Security',
			moreInfo: 'Password, 2FA, active sessions',
			link: 'security',
		},
		{
			icon: CircleQuestionMark,
			label: 'Help & Support',
			isLink: false,
		},
		{
			icon: LogOut,
			label: 'Sign Out',
			danger: true,
			isLink: false,
		},
	]
	return (
		<>
			<div className='outline mx-4 mb-4 outline-white/7  rounded-2xl flex flex-col overflow-hidden'>
				{items.map((item, index) => {
					return item.link ? (
						<Link
							to={item.link}
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
							{!item.danger && <UIArrowRight isDanger={item.danger} />}
						</Link>
					) : (
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
							{!item.danger && <UIArrowRight isDanger={item.danger} />}
						</button>
					)
				})}
			</div>
		</>
	)
}
