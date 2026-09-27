import SettingsList from '../components/main/settings/SettingsList'

export default function Settings() {
	return (
		<div className='flex w-full h-full min-w-0'>
			<div className='messagesSection outline-1 outline-gray-700/60 w-100 shrink-0 flex'>
				<SettingsList />
			</div>
		</div>
	)
}
