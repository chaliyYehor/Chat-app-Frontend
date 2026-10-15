import { MessageCircleMore, Volume2 } from 'lucide-react'
import SettingsSwitch from './SettingsSwitch'
import { useSelector } from 'react-redux'
import type { RootType } from '../../../store/store'
import { useGetUserPreferences } from '../../../hooks/useGetUserPreferences'
import { useChangeTypingSound } from '../../../hooks/useChangeTypingSound'
import { useChangeMessageSounds } from '../../../hooks/useChangeMessageSounds'

export default function SettingsSounds() {
	const appTheme = useSelector((state: RootType) => state.theme.mode)

	const { data: preferences, isPending } = useGetUserPreferences()
	const {mutateAsync: changeTypingSound, isPending: isChangeTypingSoundPending} = useChangeTypingSound()
	const {mutateAsync: changeMessageSound, isPending: isChangeMessageSoundPending} = useChangeMessageSounds()
	if (isPending) {
		return <div>Loading...</div>
	}

	const items = [
		{
			icon: MessageCircleMore,
			label: 'typingSounds',
			displayLabel: 'Typing Sound',
			ifChecked: preferences?.typingSounds ?? true,
			onChange: changeTypingSound,
			isPending: isChangeTypingSoundPending,
		},
		{
			icon: Volume2,
			label: 'messageSounds',
			displayLabel: 'Message Sound',
			ifChecked: preferences?.messageSounds ?? true,
			onChange: changeMessageSound,
			isPending: isChangeMessageSoundPending,
		},
	]
	return (
		<>
			<div className='outline mx-4 mb-4 dark:outline-white/7 outline-black/10  rounded-2xl flex flex-col'>
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
						className='flex border-b items-center dark:border-white/7 w-full h-full p-4'
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
								label={item.label as "typingSounds" | "messageSounds" | "lastSeen" | "readReceipts"}
								isPending={item.isPending}
							/>
						</div>
					</div>
				))}
			</div>
		</>
	)
}
