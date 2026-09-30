import { Users } from 'lucide-react'
import { NavLink } from 'react-router-dom'

export default function GroupsSectionBtn({
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
					to={'/groups'}
					type='button'
					onClick={onClick}
					className={({ isActive }) =>
						`nav-btn inline-flex cursor-pointer py-4 px-6 rounded-2xl transition flex-col justify-center items-center
				${
					isActive
						? 'bg-[#7C5CFC] text-white hover:bg-[#4f34bd]'
						: 'text-[#6B6B80] hover:text-[#1f1f26] hover:bg-[#ebebf0] dark:hover:text-white dark:hover:bg-[#1e1e26]'
				}`
					}
					title='Groups'
					aria-label='Groups'
				>
					<Users strokeWidth='1.5' size={30} aria-hidden='true' />
				</NavLink>
			) : (
				<NavLink
					to={'/groups'}
					type='button'
					onClick={onClick}
					className={({ isActive }) =>
						`nav-btn inline-flex cursor-pointer py-4 px-6 rounded-2xl transition flex-col justify-center items-center
				${
					isActive
						? 'bg-[#7C5CFC] text-white hover:bg-[#4f34bd]'
						: 'text-[#6B6B80] hover:text-[#1f1f26] hover:bg-[#ebebf0] dark:hover:text-white dark:hover:bg-[#1e1e26]'
				}`
					}
					title='Groups'
					aria-label='Groups'
				>
					<Users size={30} aria-hidden='true' />
					<span>Groups</span>
				</NavLink>
			)}
		</>
	)
}
