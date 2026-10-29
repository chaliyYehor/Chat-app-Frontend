import { CircleX } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootType } from '../store/store'
import { useEffect, useRef } from 'react'
import { setPopUpError } from '../store/slices/popUpSlice'
import gsap from 'gsap'

export default function PopUpError() {
	const error = useSelector((state: RootType) => state.popUpState.error)
	const dispatch =	useDispatch<AppDispatch>()
	const popupRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const popup = popupRef.current
		if (!error.heading || !error.text || !popup) return

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
					dispatch(setPopUpError({ heading: '', text: '' }))
				},
			})
		}, 5000)

		return () => {
			clearTimeout(timeout)
			gsap.killTweensOf(popup)
		}
	}, [dispatch, error.heading, error.text])

	if (!error.heading || !error.text) return null

	const states = {
		error: {
			bg: '#fb2c365c',
			iconBg: '#FB2C36',
			icon: CircleX,
		},
	}

	const Icon = states.error.icon
	return (
		<div
			ref={popupRef}
			role='alert'
			aria-atomic='true'
			style={{ border: `1px solid ${states.error.bg}` }}
			className='pop-up-error absolute pointer-events-none opacity-0 left-1/2 z-50 top-4  flex w-[calc(100%-2rem)] max-w-100 px-3 py-2 -translate-x-1/2 justify-start items-center gap-3 rounded-2xl shadow-xl dark:bg-[#16161B] bg-white'
		>
			<div
				style={{ backgroundColor: states.error.bg }}
				className='w-10 h-10 flex rounded-xl justify-center items-center'
			>
				<Icon color={`${states.error.iconBg}`} />
			</div>

			<div>
				<h3 className='text-black dark:text-white font-inter text-[18px] font-semibold'>
					{error.heading || 'Error'}
				</h3>
				<p className='text-sm text-[#6B6B80] leading-relaxed font-inter'>
					{error.text || 'An error occurred.'}
				</p>
			</div>
		</div>
	)
}
