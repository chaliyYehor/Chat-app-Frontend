import { Link } from 'react-router-dom'
import Avatar from '../Avatar'
import Status from './Status'
import UIArrowRight from './UIArrowRight'

export default function SettingsProfile() {
	return (
		<Link
			to='editProfile'
			className='outline mx-4 mb-4 dark:outline-white/7 outline-black/10 hover:outline-[#7C5CFC]/60 p-4 rounded-2xl flex'
		>
			<div className='flex gap-4 w-full h-full items-center'>
				<Avatar />
				<div className='flex flex-col flex-1 min-w-0'>
					<h2 className='dark:text-[#F0F0F5] font-inter font-semibold max-w-[90%] truncate'>
						Alex Rivera
					</h2>
					<p className='text-sm text-[#6B6B80] mb-1 max-w-[90%] truncate'>
						alex.rivera@gmail.com
					</p>
					<Status status='online' />
				</div>
				<UIArrowRight />
			</div>
		</Link>
	)
}
