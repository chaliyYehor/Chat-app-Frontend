import { createPortal } from 'react-dom'
import { useIsMobile } from '../../../hooks/useIsMobile'
import { Trash } from 'lucide-react'
import Button from '@mui/material/Button'
import { useSelector } from 'react-redux'
import type { RootType } from '../../../store/store'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useState } from 'react'
import { authClient } from '../../../lib/auth-client'

gsap.registerPlugin(useGSAP)

export default function SetDeleteAccount({
	setShowPreview,
}: {
	setShowPreview: (show: boolean) => void
}) {
	const [isLoading, setIsLoading] = useState(false)
	const [globalError, setGlobalError] = useState<string | null>(null)

	const isMobile = useIsMobile()
	const appTheme = useSelector((state: RootType) => state.theme.mode)
	const modalRef = useRef<HTMLDivElement>(null)
	const backdropRef = useRef<HTMLDivElement>(null)

	useGSAP(() => {
		const timeline = gsap.timeline()

		timeline
			.fromTo(
				backdropRef.current,
				{ autoAlpha: 0 },
				{ autoAlpha: 1, duration: 0.2, ease: 'power1.out' },
			)
			.fromTo(
				modalRef.current,
				{ autoAlpha: 0, y: 24, scale: 0.96 },
				{ autoAlpha: 1, y: 0, scale: 1, duration: 0.3, ease: 'power2.out' },
				'-=0.05',
			)
	}, [])

	async function handleDeleteAccount() {
		setIsLoading(true)
		const { error } = await authClient.deleteUser({
			callbackURL: `${window.location.origin}/signUp`,
		})

		if(error) {
			setGlobalError(error.message || 'Failed to delete account')
		}

		setIsLoading(false)
	}

	return createPortal(
		<div
			ref={backdropRef}
			onClick={() => setShowPreview(false)}
			role='dialog'
			aria-modal='true'
			aria-label='Image preview'
			tabIndex={-1}
			className='fixed w-screen h-dvh cursor-pointer inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-xs'
		>
			<div
				ref={modalRef}
				onClick={event => event.stopPropagation()}
				style={{ maxWidth: isMobile ? '90vw' : '520px' }}
				className='rounded-2xl border border-white/10 dark:bg-[#16161B] bg-white text-black dark:text-white p-6 flex flex-col shadow-2xl cursor-default rounded-t-3xl md:rounded-2xl overflow-hidden my-20 pb-3 md:pb-0 gap-1'
			>
				<div className='bg-[#FB2C36]/10 mb-4 flex items-center justify-center w-15 h-15 rounded-2xl'>
					<Trash color='#FF6467' />
				</div>
				<h2 className='text-xl font-bold font-inter'>Delete your account?</h2>
				<p className='mt-2 text-md leading-relaxed text-[#8080A0] font-inter'>
					Are you sure? Your profile, messages, groups, and call history will be
					permanently deleted. This action cannot be undone.
				</p>

				<div className='flex gap-3 mb-2 mt-3 w-full'>
					<Button
						type='submit'
						variant='contained'
						onClick={() => setShowPreview(false)}
						sx={{
							width: '100%',
							height: '40px',
							borderRadius: '10px',

							marginTop: '10px',

							background: appTheme === 'dark' ? '#19191f' : '#EBEBF0',

							color: appTheme === 'dark' ? '#fff' : 'black',
							fontSize: '16px',
							fontWeight: 600,
							padding: '12px 0',
							textTransform: 'none',

							boxShadow: 'none',

							'&:hover': {
								background: appTheme === 'dark' ? '#111116' : '#f1f1f3',
								boxShadow: 'none',
							},

							'&:active': {
								transform: 'scale(0.99)',
							},
						}}
					>
						Cancel
					</Button>
					<Button
						type='submit'
						variant='contained'
						onClick={handleDeleteAccount}
						sx={{
							width: '100%',
							height: '40px',
							borderRadius: '10px',

							marginTop: '10px',

							background: '#FB2C36',

							color: '#fff',
							fontSize: '16px',
							fontWeight: 600,
							padding: '12px 0',
							textTransform: 'none',

							boxShadow: 'none',

							'&:hover': {
								background: '#c50f18',
								boxShadow: 'none',
							},

							'&:active': {
								transform: 'scale(0.99)',
							},
						}}
					>
						{isLoading ? <div className='loader' /> : 'Yes, delete'}
					</Button>
				</div>
				<p
					className='mt-1 mb-2 min-h-5 first-letter:capitalize select-none text-sm text-red-500 dark:text-red-400 text-center'
					role='alert'
				>
					{globalError || '\u00A0'}
				</p>
			</div>
		</div>,
		document.body,
	)
}
