import { Check, Clock2 } from 'lucide-react'
import SettingsSwitch from './SettingsSwitch'
import { useSelector } from 'react-redux'
import type { RootType } from '../../../store/store'
import { useGetUserPreferences } from '../../../hooks/useGetUserPreferences'
import { useChangeLastSeen } from '../../../hooks/useChangeLastSeen'
import { useChangeReadReceipts } from '../../../hooks/useChangeReadReceipts'

export default function SettingsPrivacy() {
	const appTheme = useSelector((state: RootType) => state.theme.mode)

	const { data: preferences, isPending } = useGetUserPreferences()
	const { mutateAsync: changeLastSeen, isPending: isChangeLastSeenPending } =
		useChangeLastSeen()
	const {
		mutateAsync: changeReadReceipts,
		isPending: isChangeReadReceiptsPending,
	} = useChangeReadReceipts()
	if (isPending) {
		return (
			<div className='w-full h-125 flex justify-center items-center'>
				<div className='loader' />
			</div>
		)
	}

	const items = [
		{
			icon: Check,
			label: 'readReceipts',
			displayLabel: 'Read Receipts',
			ifChecked: preferences?.readReceipts ?? false,
			onChange: changeReadReceipts,
			isPending: isChangeReadReceiptsPending,
		},
		{
			icon: Clock2,
			label: 'lastSeen',
			displayLabel: 'Last Seen',
			ifChecked: preferences?.lastSeen ?? false,
			onChange: changeLastSeen,
			isPending: isChangeLastSeenPending,
		},
	]
	return (
		<>
			<div className='outline mx-4 mb-4 dark:outline-white/7 outline-black/10 rounded-2xl flex flex-col'>
				{items.map((item, index) => (
					<div
						key={index}
						style={{
							borderBottom:
								index !== items.length - 1 && appTheme === 'dark'
									? '1px solid rgba(255, 255, 255, 0.07)'
									: index !== items.length - 1
										? '1px solid rgba(0, 0, 0, 0.07)'
										: 'none',
						}}
						className='flex border-b items-center border-white/7 w-full h-full p-4'
					>
						<div className='flex-1 flex items-center gap-1'>
							<item.icon size={18} color='#6B6B80' />
							<span className='dark:text-white ml-2 font-medium font-inter'>
								{item.displayLabel}
							</span>
						</div>
						<div className='self-end'>
							<SettingsSwitch
								ifChecked={item.ifChecked}
								onChange={item.onChange}
								label={
									item.label as
										| 'typingSounds'
										| 'messageSounds'
										| 'lastSeen'
										| 'readReceipts'
								}
								isPending={item.isPending}
							/>
						</div>
					</div>
				))}
			</div>
		</>
	)
}
