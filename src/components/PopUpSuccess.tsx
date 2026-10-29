import { Check } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootType } from '../store/store'
import { useEffect, useRef } from 'react'
import { setPopUpSuccess } from '../store/slices/popUpSlice'
import gsap from 'gsap'

export default function PopUpSuccess() {
	const success = useSelector((state: RootType) => state.popUpState.success)
	const dispatch = useDispatch<AppDispatch>()
	const popupRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const popup = popupRef.current
		if (!success.heading || !success.text || !popup) return

		gsap.fromTo(
			popup,
			{ opacity: 0, pointerEvents: 'none' },
			{
				opacity: 1,
				pointerEvents: 'auto',
				duration: 0.3,
				ease: 'power2.out',
			},
		)

		const timeout = setTimeout(() => {
			gsap.to(popup, {
				opacity: 0,
				pointerEvents: 'none',
				duration: 0.5,
				ease: 'power2.in',
				onComplete: () => {
					dispatch(setPopUpSuccess({ heading: '', text: '' }))
				},
			})
		}, 5000)

		return () => {
			clearTimeout(timeout)
			gsap.killTweensOf(popup)
		}
	}, [dispatch, success.heading, success.text])

	if (!success.heading || !success.text) return null

	const state = {
		success: {
			bg: '#00d4aa2e',
			iconBg: '#00D4AA',
			icon: Check,
		},
	}

	const Icon = state.success.icon
	return (
		<div
			ref={popupRef}
			role='status'
			aria-live='polite'
			aria-atomic='true'
			style={{ border: `1px solid ${state.success.bg}` }}
			className='pop-up-success absolute pointer-events-none opacity-0 left-1/2 z-50 top-4  flex w-[calc(100%-2rem)] max-w-100 px-3 py-2 -translate-x-1/2 justify-start items-center gap-3 rounded-2xl shadow-xl dark:bg-[#16161B] bg-white'
		>
			<div
				style={{ backgroundColor: state.success.bg }}
				className='w-10 h-10 flex rounded-xl justify-center items-center'
			>
				<Icon color={`${state.success.iconBg}`} />
			</div>

			<div>
				<h3 className='text-black dark:text-white font-inter text-[18px] font-semibold'>
					{success.heading || 'Success'}
				</h3>
				<p className='text-sm text-[#6B6B80] leading-relaxed font-inter'>
					{success.text || 'Operation completed successfully.'}
				</p>
			</div>
		</div>
	)
}
