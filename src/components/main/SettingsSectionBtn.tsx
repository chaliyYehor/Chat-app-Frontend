import { Settings } from 'lucide-react'
import { NavLink } from 'react-router-dom'

export default function SettingsSectionBtn({
	isSmallScreen,
	onClick,
}: {
	isSmallScreen: boolean
	onClick?: () => void
}) {
	return (
		<>
			{!isSmallScreen ? (
				<NavLink
					to={'/settings'}
					type='button'
					onClick={onClick}
					className={({ isActive }) =>
						`nav-btn inline-flex cursor-pointer py-4 px-6 rounded-2xl transition flex-col justify-center items-center
				${
					isActive
						? 'bg-[#7C5CFC] text-white hover:bg-[#4f34bd]'
						: 'text-[#6B6B80] hover:text-white hover:bg-[#1e1e26]'
				}`
					}
					title='Settings'
					aria-label='Settings'
				>
					<Settings size={30} aria-hidden='true' />
				</NavLink>
			) : (
				<NavLink
					to={'/settings'}
					type='button'
					onClick={onClick}
					className={({ isActive }) =>
						`nav-btn inline-flex cursor-pointer py-4 px-6 rounded-2xl transition flex-col justify-center items-center
				${
					isActive
						? 'bg-transparent text-[#7C5CFC]'
						: 'text-[#6B6B80] hover:text-white'
				}`
					}
					title='Settings'
					aria-label='Settings'
				>
					<Settings size={30} aria-hidden='true' />
					<span>Settings</span>
				</NavLink>
			)}
		</>
	)
}
