import { Link } from 'react-router-dom'
import Avatar from '../Avatar'
import Status from './Status'
import UIArrowRight from './UIArrowRight'
import { useGetUserInfo } from '../../../hooks/useGetUserInfo'
import clsx from 'clsx'
import { authClient } from '../../../lib/auth-client'

export default function SettingsProfile() {
	const { data: userInfo, isPending } = useGetUserInfo()
	const { data: session } = authClient.useSession()

	return (
		<Link
			to='editProfile'
			className='outline mx-4 mb-4 dark:outline-white/7 outline-black/10 hover:outline-[#7C5CFC]/60 p-4 rounded-2xl flex'
		>
			<div className='flex gap-4 w-full h-full items-center'>
				{isPending ? (
					<div className='w-15 h-15 rounded-[50%] bg-gray-300 dark:bg-gray-600' />
				) : (
					<Avatar state={userInfo?.status || 'offline'} />
				)}
				<div className='flex flex-col flex-1 min-w-0 gap-1'>
					<div
						className={clsx(
							isPending ? 'skeleton-shimmer' : '',
							'w-full min-h-6 rounded-xl',
						)}
					>
						<h2 className='dark:text-[#F0F0F5] font-inter font-semibold max-w-[90%] truncate'>
							{userInfo?.name || ''}
						</h2>
					</div>
					<div
						className={clsx(
							isPending ? 'skeleton-shimmer' : '',
							'w-full min-h-4 rounded-xl',
						)}
					>
						<p className='text-sm text-[#6B6B80] mb-1 max-w-[90%] truncate'>
							{session?.user.email || ''}
						</p>
					</div>
					<Status status={userInfo?.status || 'offline'} />
				</div>
				<UIArrowRight />
			</div>
		</Link>
	)
}
