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
import { useGetUserInfo } from '../../../hooks/useGetUserInfo'
import { authClient } from '../../../lib/auth-client'
import { useEffect, useState } from 'react'
import { useEditUserProfileInfo } from '../../../hooks/useEditUserProfileInfo'
import type { AppDispatch } from '../../../store/store'
import { useDispatch } from 'react-redux'
import { setPopUpError } from '../../../store/slices/popUpSlice'

export default function SettingsEditProfile() {
	const { data: userInfo, isError: isUserInfoError, isPending: isUserInfoLoading } = useGetUserInfo()

	const dispatch = useDispatch<AppDispatch>()

	useEffect(() => {
		if (isUserInfoError) {
			dispatch(
				setPopUpError({
					heading: 'Error',
					text: 'Failed to load user info. Please try again.',
				}),
			)
		}
	}, [isUserInfoError, dispatch])

	const { data: session } = authClient.useSession()
	const [globalError, setGlobalError] = useState('')

	const { mutateAsync: editUserProfileInfo, isPending } =
		useEditUserProfileInfo()

	const methods = useForm<ChangeUserInfoInput, unknown, ChangeUserInfo>({
		resolver: zodResolver(changeUserInfoSchema),
		defaultValues: {
			previouslySetStatus: 'online',
			userId: '',
			name: '',
			bio: '',
			email: '',
			file: undefined,
		},
	})
	const { reset } = methods
	const {
		formState: { isDirty, isSubmitting, dirtyFields },
	} = methods
	void dirtyFields

	useEffect(() => {
		if (!userInfo) return

		reset(
			{
				previouslySetStatus: userInfo.previouslySetStatus,
				userId: '@' + userInfo.userPubId,
				name: userInfo.name,
				bio: userInfo.about ?? '',
				email: session?.user.email ?? '',
				file: undefined,
			},
			{ keepDirtyValues: true },
		)
	}, [userInfo, session?.user.email, reset])

	const onSubmit: SubmitHandler<ChangeUserInfo> =async data => {
		setGlobalError('')
		const { bio, email, file, name, previouslySetStatus, userId } = data

		const formData = new FormData()
		formData.append('previouslySetStatus', previouslySetStatus ?? 'online')
		formData.append('userId', userId ?? '')
		formData.append('name', name ?? '')
		formData.append('bio', bio ?? '')
		formData.append('email', email ?? '')
		if (file) {
			formData.append('file', file)
		}
		try {
			await editUserProfileInfo(formData)
		} catch (error) {
			setGlobalError('Failed to update user profile')
			console.error('Error updating user profile:', error)
		}
	}

	const isMobile = useIsMobile()
	return (
		<div className='chats chatListContainer box-border h-full w-full min-w-0 max-w-full overflow-x-hidden overflow-y-auto scrollbar-none dark:bg-[#16161b] bg-white'>
			{isUserInfoLoading ? (
				<div
					className='loader m-auto mt-[50dvh]'
					role='status'
					aria-label={`Loading user info`}
				/>
			) : (
				<>
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
								disabled={isSubmitting || !isDirty}
								sx={{
									width: isMobile ? '70%' : 'calc(100% - 32px)',
									maxWidth: '448px',
									height: '50px',
									borderRadius: '10px',
									alignSelf: 'center',
									marginTop: '10px',
									marginLeft: isMobile ? '-80px' : '16px',
									background:
										'linear-gradient(90deg, #7654E8 0%, #5437C9 100%)',

									color: '#fff',
									fontSize: '16px',
									fontWeight: 600,
									padding: '12px 0',
									textTransform: 'none',

									boxShadow: 'none',

									'&:hover': {
										background:
											'linear-gradient(90deg, #7654E8 0%, #5437C9 100%)',
										boxShadow: 'none',
									},

									'&:active': {
										transform: 'scale(0.99)',
									},
								}}
							>
								{isPending ? <div className='loader' /> : 'Save Changes'}
							</Button>
							<p
								className='mt-1 min-h-5 first-letter:capitalize select-none text-sm text-red-500 dark:text-red-400 text-center'
								role='alert'
							>
								{globalError || '\u00A0'}
							</p>
						</form>
					</FormProvider>
				</>
			)}
		</div>
	)
}
