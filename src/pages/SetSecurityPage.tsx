import SettingsSecurity from '../components/main/settings/SettingsSecurity'

export default function SetSecurityPage() {
	return (
		<div className='flex w-full h-full min-w-0'>
			<div className='messagesSection outline-1 outline-gray-700/60 w-100 shrink-0 flex'>
				<SettingsSecurity />
			</div>
		</div>
	)
}
