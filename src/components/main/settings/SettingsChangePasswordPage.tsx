import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootType } from '../../../store/store'
import PasswordItem from './PasswordItem'
import Button from '@mui/material/Button'
import type { ChangePasswordType } from '../../../schemas/auth/changePassword'
import { useFormContext } from 'react-hook-form'
import { useIsMobile } from '../../../hooks/useIsMobile'
import { authClient } from '../../../lib/auth-client'
import { useState } from 'react'
import { SettingsChangePasswordSuccess } from './SettingsChangePasswordSuccess'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'

gsap.registerPlugin(useGSAP)

export default function SettingsChangePasswordPage() {
	const appTheme = useSelector((state: RootType) => state.theme.mode)
	const pageRef = useRef<HTMLDivElement>(null)

	const [globalError, setGlobalError] = useState<string | null>(null)
	const [isSuccess, setIsSuccess] = useState(false)

	const isMobile = useIsMobile()

	const {
		handleSubmit,
		formState: { isSubmitting },
	} = useFormContext<ChangePasswordType>()

	const onSubmit = async (data: ChangePasswordType) => {
		const currentPassword = data.currentPassword
		const newPassword = data.password
		const { error } = await authClient.changePassword(
			{
				currentPassword,
				newPassword,
			},
		)

		if (error) {
			setGlobalError(
				error.message
					? error.message
					: 'An error occurred while changing the password.',
			)
			return
		} else {
			setIsSuccess(true)
		}
	}

	useGSAP(
		() => {
			const timeline = gsap.timeline({
				defaults: { ease: 'power3.out' },
			})

			timeline.from('[data-change-password-animate]', {
				y: 24,
				autoAlpha: 0,
				duration: 0.55,
				stagger: 0.1,
			})

			return () => timeline.kill()
		},
		{
			scope: pageRef,
			dependencies: [isSuccess],
			revertOnUpdate: true,
		},
	)

	return (
		<>
			<div
				ref={pageRef}
				className='chats chatListContainer h-full w-full min-w-0 dark:bg-[#16161b] bg-white'
			>
				<div className='mb-10 flex flex-col mt-5 gap-2'>
					<Link
						data-change-password-animate
						to='/settings/security'
						className='text-[#6B6B80] w-fit hover:text-black dark:hover:text-white transition-all duration-200 ease-in-out flex justify-center items-center font-inter text-[20px]	gap-2 pl-4'
					>
						<ArrowLeft /> Security
					</Link>
					{!isSuccess && (
						<div
							data-change-password-animate
							className='flex items-start justify-between px-4 py-2 flex-col gap-2'
						>
							<h2 className='dark:text-white text-3xl font-bold '>
								Change Password
							</h2>
							<p className='text-[#6B6B80] text-md mb-1 block leading-relaxed'>
								Choose a strong password you don't use elsewhere.
							</p>
						</div>
					)}
				</div>
				{(!isSuccess) && (
					<form
						data-change-password-animate
						onSubmit={handleSubmit(onSubmit)}
						className='flex flex-col gap-4'
					>
						<div className='flex flex-col md:w-full w-[80%]'>
							<div className='outline mx-4 mb-4 dark:outline-white/7 outline-black/10  rounded-2xl flex flex-col'>
								<div
									style={{
										borderBottom:
										appTheme === 'dark'
											? '1px solid rgba(0, 0, 0, 0.1)'
											: '1px solid rgba(255, 255, 255, 0.07)',
								}}
								className='flex flex-col border-b items-center rounded-2xl border-white/7 w-full h-full px-2 py-4 overflow-hidden'
							>
								<PasswordItem
									label='CURRENT PASSWORD'
									registerName='currentPassword'
									placeholder='Enter current password'
								/>
								<PasswordItem
									label='NEW PASSWORD'
									registerName='password'
									placeholder='Enter new password'
								/>
								<PasswordItem
									label='CONFIRM NEW PASSWORD'
									registerName='confirmPassword'
									placeholder='Re-enter new password'
								/>
							</div>
						</div>
					</div>
					<Button
						type='submit'
						variant='contained'
						disabled={isSubmitting}
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
						Update Password
					</Button>
					<p
						className='mt-1 min-h-5 first-letter:capitalize select-none text-sm text-red-500 dark:text-red-400 text-center'
						role='alert'
					>
						{globalError || '\u00A0'}
					</p>
				</form>)}
				{isSuccess && (
					<div data-change-password-animate>
						<SettingsChangePasswordSuccess />
					</div>
				)}
			</div>
		</>
	)
}
