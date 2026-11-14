import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import SettingsLabel from './SettingsLabel'
import SettingsChangePassword from './SettingsChangePassword'
import SettingsActSess from './SettingsActSess'
import SettingsDanger from './SettingsDanger'
import { authClient } from '../../../lib/auth-client'
import { useEffect, useState } from 'react'
import SettingsSetNewPassword from './SettingsSetNewPassword'

export default function SettingsSecurity() {
	const [hasPassword, setHasPassword] = useState<boolean | null>(
    null,
  );
	const [hide, setHide] = useState<boolean>(false);
	const { isPending, data: sessionData } = authClient.useSession()
  useEffect(() => {
    async function checkPassword() {
      const { data: accounts, error } =
        await authClient.listAccounts();

      if (error || !accounts) {
        return;
      }

      setHasPassword(
        accounts.some(
          (account) => account.providerId === "credential",
        ),
      );
    }

    void checkPassword();
  }, []);

	useEffect(() => {
		if (!isPending && sessionData) {
			if (sessionData.user.email.includes('demo@erxxue.com')) {
				setHide(true)
			}
		}
	}, [isPending, sessionData]);
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
			{hide ?
				<div className='w-full mt-20 flex justify-center items-center'>
					<p className='p-4 text-sm text-[#6B6B80] font-inter'>This page has been hidden for demo purposes.</p>
				</div> :
			<div className='flex flex-col gap-4'>
				<div className='flex flex-col md:w-full w-[80%]'>
					<SettingsLabel label={'Authentication'} />
					{isPending && <div className='h-14 w-[90%] ml-5 rounded-2xl skeleton-shimmer' />}
					{hasPassword ? <SettingsChangePassword /> : <SettingsSetNewPassword />}
				</div>

				<div className='flex flex-col md:w-full w-[80%]'>
					<SettingsLabel label={'active sessions'} />
					<SettingsActSess />
				</div>

				<div className='flex flex-col md:w-full w-[80%]'>
					<SettingsLabel label={'danger zone'} />
					<SettingsDanger />
				</div>
			</div>}
		</div>
	)
}
