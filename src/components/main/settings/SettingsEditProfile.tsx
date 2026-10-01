import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@mui/material'
import { ArrowLeft } from 'lucide-react'
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form'
import { Link } from 'react-router-dom'
import {
	changeUserInfoSchema,
	type ChangeUserInfo,
	type ChangeUserInfoInput,
} from '../../../schemas/main/changeUserInfo'
import ContactInfo from './ContactInfo'
import EditProfileChangePhoto from './EditProfileChangePhoto'
import EditProfileStatus from './EditProfileStatus'
import PersonalInfo from './PersonalInfo'
import SettingsLabel from './SettingsLabel'
import { useIsMobile } from '../../../hooks/useIsMobile'

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

	const isMobile = useIsMobile()

	return (
		<div className='chatListContainer box-border h-full w-full min-w-0 max-w-full overflow-x-hidden overflow-y-auto scrollbar-none dark:bg-[#16161b] bg-white'>
			<div className='w-full min-w-0 mb-8 sm:mb-10 flex flex-col mt-4 sm:mt-5 gap-2'>
				<Link
					to='/settings'
					className='text-[#6B6B80] w-fit max-w-full dark:hover:text-white hover:text-black transition-all duration-200 ease-in-out flex justify-center items-center font-inter text-lg sm:text-[20px] gap-2 px-4'
				>
					<ArrowLeft /> Back
				</Link>
				<div className='flex min-w-0 items-center justify-between px-4 py-2'>
					<h2 className='dark:text-white text-2xl sm:text-3xl font-bold truncate'>
						Edit Profile
					</h2>
				</div>
			</div>
			<FormProvider {...methods}>
				<form
					className='w-full min-w-0 max-w-full flex flex-col pb-15'
					onSubmit={methods.handleSubmit(onSubmit)}
				>
					<EditProfileChangePhoto />

					<div className='flex flex-col md:w-full w-[80%]'>
						<SettingsLabel label={'status'} />
						<EditProfileStatus />
					</div>

					<div className='flex flex-col md:w-full w-[80%]'>
						<SettingsLabel label={'personal info'} />
						<PersonalInfo />
					</div>

					<div className='flex flex-col md:w-full w-[80%]'>
						<SettingsLabel label={'contact'} />
						<ContactInfo />
					</div>

					<Button
						type='submit'
						variant='contained'
						disabled={
							methods.formState.isSubmitting || !methods.formState.isDirty
						}
						sx={{
							width: isMobile ? '70%' : 'calc(100% - 32px)',
							maxWidth: '448px',
							height: '50px',
							borderRadius: '10px',
							alignSelf: 'center',
							marginTop: '10px',
							marginLeft: isMobile ? '-80px' : '16px',
							background: 'linear-gradient(90deg, #7654E8 0%, #5437C9 100%)',

							color: '#fff',
							fontSize: '16px',
							fontWeight: 600,
							padding: '12px 0',
							textTransform: 'none',

							boxShadow: 'none',

							'&:hover': {
								background: 'linear-gradient(90deg, #7654E8 0%, #5437C9 100%)',
								boxShadow: 'none',
							},

							'&:active': {
								transform: 'scale(0.99)',
							},
						}}
					>
						Save Changes
					</Button>
				</form>
			</FormProvider>
		</div>
	)
}
