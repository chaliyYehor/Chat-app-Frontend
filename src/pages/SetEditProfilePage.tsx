import SettingsEditProfile from '../components/main/settings/SettingsEditProfile'

export default function SetEditProfilePage() {
	return (
		<div className='flex w-full h-full min-w-0'>
			<div className='messagesSection outline-1 outline-gray-700/60 w-100 shrink-0 flex'>
				<SettingsEditProfile />
			</div>
		</div>
	)
}
