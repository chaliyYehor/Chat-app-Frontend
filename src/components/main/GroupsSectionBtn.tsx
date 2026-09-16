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
					to={'#'}
					type='button'
					onClick={onClick}
					className={({ isActive }) =>
						`nav-btn inline-flex cursor-pointer py-4 px-6 rounded-2xl transition flex-col justify-center items-center
				${
					isActive
						? 'bg-[#7C5CFC] text-white hover:bg-[#4f34bd]'
						: 'text-[#6B6B80] hover:text-white'
				}`
					}
					title='Groups'
				>
					<Users size={30} />
				</NavLink>
			) : (
				<NavLink
					to={'#'}
					type='button'
					onClick={onClick}
					className={({ isActive }) =>
						`nav-btn inline-flex cursor-pointer py-4 px-6 rounded-2xl transition flex-col justify-center items-center
				${
					isActive
						? 'bg-transparent text-[#7C5CFC]'
						: 'text-[#6B6B80] hover:text-white bg-transparent'
				}`
					}
					title='Groups'
				>
					<Users size={30} />
					<span>Groups</span>
				</NavLink>
			)}
		</>
	)
}
