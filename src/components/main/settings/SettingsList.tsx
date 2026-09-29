import SettingsLabel from './SettingsLabel'
import SettingsPrivacy from './SettingsPrivacy'
import SettingsProfile from './SettingsProfile'
import SettingsSounds from './SettingsSounds'

export default function SettingsList() {
	return (
		<div className='chatListContainer h-dvh w-full min-w-0 bg-[#16161b]'>
			<div className='upper mb-10 flex flex-col gap-4 mt-5'>
				<div className='flex items-center justify-between px-4 py-2'>
					<h2 className='text-white text-3xl font-bold '>Settings</h2>
				</div>
			</div>
			<SettingsProfile />
			<div className='flex flex-col'>
				<SettingsLabel label={'SOUNDS'} />
				<SettingsSounds />
			</div>
			
			<div className='flex flex-col'>
				<SettingsLabel label={'PRIVACY'} />
				<SettingsPrivacy />
			</div>

		</div>
	)
}
