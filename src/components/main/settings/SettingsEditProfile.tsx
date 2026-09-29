import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import EditProfileChangePhoto from './EditProfileChangePhoto'
import SettingsLabel from './SettingsLabel'
import EditProfileStatus from './EditProfileStatus'
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form'
import {
	changeUserInfoSchema,
	type ChangeUserInfo,
	type ChangeUserInfoInput,
} from '../../../schemas/main/changeUserInfo'
import { zodResolver } from '@hookform/resolvers/zod'
import PersonalInfo from './PersonalInfo'
import ContactInfo from './ContactInfo'

export default function SettingsEditProfile() {
	const methods = useForm<ChangeUserInfoInput, unknown, ChangeUserInfo>({
		resolver: zodResolver(changeUserInfoSchema),
		defaultValues: {
			status: 'online',
			displayName: 'Alex Rivera',
			username: 'alexrivera',
			bio: 'I am a software developer.',
			email: 'alex.rivera@example.com',
			file: undefined,
		},
	})
	const onSubmit: SubmitHandler<ChangeUserInfo> = data => {
		console.log(data)
	}

	return (
		<div className='chatListContainer h-dvh w-full min-w-0 overflow-y-auto scrollbar-none bg-[#16161b]'>
			<div className='upper mb-10 flex flex-col mt-5 gap-2'>
				<Link
					to='/settings'
					className='text-[#6B6B80] w-fit hover:text-white transition-all duration-200 ease-in-out flex justify-center items-center font-inter text-[20px]	gap-2 pl-4'
				>
					<ArrowLeft /> Back
				</Link>
				<div className='flex items-center justify-between px-4 py-2'>
					<h2 className='text-white text-3xl font-bold '>Edit Profile</h2>
				</div>
			</div>
			<FormProvider {...methods}>
				<form className='w-full' onSubmit={methods.handleSubmit(onSubmit)}>
					<EditProfileChangePhoto />

					<div className='flex flex-col'>
						<SettingsLabel label={'status'} />
						<EditProfileStatus />
					</div>

					<div className='flex flex-col'>
						<SettingsLabel label={'personal info'} />
						<PersonalInfo />
					</div>

					<div className='flex flex-col'>
						<SettingsLabel label={'contact'} />
						<ContactInfo />
					</div>
				</form>
			</FormProvider>
		</div>
	)
}
