import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import SettingsLabel from './SettingsLabel'
import SettingsChangePassword from './SettingsChangePassword'
import SettingsActSess from './SettingsActSess'
import SettingsDanger from './SettingsDanger'

export default function SettingsSecurity() {
	return (
		<div className='chats chatListContainer h-full w-full min-w-0 dark:bg-[#16161b] bg-white'>
			<div className='mb-10 flex flex-col mt-5 gap-2'>
				<Link
					to='/settings'
					className='text-[#6B6B80] w-fit hover:text-black dark:hover:text-white transition-all duration-200 ease-in-out flex justify-center items-center font-inter text-[20px]	gap-2 pl-4'
				>
					<ArrowLeft /> Back
				</Link>
				<div className='flex items-center justify-between px-4 py-2'>
					<h2 className='dark:text-white text-3xl font-bold '>Security</h2>
				</div>
			</div>
			<div className='flex flex-col gap-4'>
				<div className='flex flex-col md:w-full w-[80%]'>
					<SettingsLabel label={'Authentication'} />
					<SettingsChangePassword />
				</div>

				<div className='flex flex-col md:w-full w-[80%]'>
					<SettingsLabel label={'active sessions'} />
					<SettingsActSess />
				</div>

				<div className='flex flex-col md:w-full w-[80%]'>
					<SettingsLabel label={'danger zone'} />
					<SettingsDanger />
				</div>
			</div>
		</div>
	)
}
