import { CircleQuestionMark, LogOut, Shield, User } from 'lucide-react'
import UIArrowRight from './UIArrowRight'
import { Link, useNavigate } from 'react-router-dom'
import { authClient } from '../../../lib/auth-client'
import type { RootType } from '../../../store/store'
import { useSelector } from 'react-redux'

export default function SettingsAccount() {
	const navigate = useNavigate()

	const appTheme = useSelector((state: RootType) => state.theme.mode)

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
			label: 'Privacy policy',
			link: 'privacy',
		},
		{
			icon: LogOut,
			label: 'Sign Out',
			danger: true,
			isLink: false,
			onClick: async () => {
				await authClient.signOut()
				navigate('/login', { replace: true })
			},
		},
	]
	return (
		<>
			<div className='outline mx-4 mb-4 dark:outline-white/7 outline-black/10  rounded-2xl flex flex-col overflow-hidden'>
				{items.map((item, index) => {
					return item.link ? (
						<Link
							to={item.link}
							key={index}
							style={{
								borderBottom:
									index !== items.length - 1 && appTheme === 'dark'
										? '1px solid rgba(255, 255, 255, 0.07)'
										: index !== items.length - 1
											? '1px solid rgba(0, 0, 0, 0.07)'
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
										style={{
											color: item.danger
												? '#EF4444'
												: appTheme === 'dark'
													? '#F0F0F5'
													: '#000000',
										}}
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
							type='button'
							key={index}
							onClick={'onClick' in item ? item.onClick : undefined}
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
										style={{
											color: item.danger
												? '#EF4444'
												: appTheme === 'dark'
													? '#F0F0F5'
													: '#000000',
										}}
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
