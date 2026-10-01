import { Outlet, useLocation } from 'react-router-dom'
import SettingsList from '../components/main/settings/SettingsList'

export default function Settings() {
	const { pathname } = useLocation()
	const isSettingsRoot = pathname === '/settings'

	return (
		<div className='flex w-full h-full min-h-0 min-w-0 relative'>
			<div
				className={`${
					isSettingsRoot ? 'flex' : 'hidden md:flex'
				} messagesSection outline-1 outline-gray-700/60 md:w-100 w-full shrink-0`}
			>
				<SettingsList />
			</div>
			<div
				className={`${
					isSettingsRoot ? 'hidden md:flex' : 'flex'
				} w-full md:flex-1 min-w-0 min-h-0 h-full`}
			>
				<Outlet />
			</div>
		</div>
	)
}
