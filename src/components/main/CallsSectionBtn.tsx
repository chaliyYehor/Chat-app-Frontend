import { Phone } from 'lucide-react'
import { NavLink } from 'react-router-dom'

export default function CallsSectionBtn({
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
					to={'/calls'}
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
					title='Calls'
					aria-label='Calls'
				>
					<Phone size={30} aria-hidden='true' />
				</NavLink>
			) : (
				<NavLink
					to={'/calls'}
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
					title='Calls'
					aria-label='Calls'
				>
					<Phone size={30} aria-hidden='true' />
					<span>Calls</span>
				</NavLink>
			)}
		</>
	)
}
