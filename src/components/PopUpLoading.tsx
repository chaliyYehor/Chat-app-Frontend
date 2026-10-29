import { useSelector } from 'react-redux'
import type { RootType } from '../store/store'

export default function PopUpLoading() {
	const loading = useSelector((state: RootType) => state.popUpState.loading)
	if (!loading.heading && !loading.text) return null

	const state = {
		loading: {
			bg: '#7c5cfc5d',
			iconBg: '#7C5CFC',
		},
	}

	return (
		<div
			role='status'
			aria-live='polite'
			aria-busy='true'
			style={{ border: `1px solid ${state.loading.bg}` }}
			className='pop-up-loading absolute pointer-events-none opacity-0 left-1/2 z-50 top-4 flex w-[calc(100%-2rem)] max-w-100 -translate-x-1/2 items-center justify-start gap-3 rounded-2xl bg-white px-3 py-2 shadow-xl dark:bg-[#16161B]'
		>
			<div
				style={{ backgroundColor: state.loading.bg }}
				className='flex h-10 w-10 items-center justify-center rounded-xl'
			>
				<div className='pendingState' />
			</div>

			<div>
				<h3 className='font-inter text-[18px] font-semibold text-black dark:text-white'>
					{loading.heading || 'Loading...'}
				</h3>
				<p className='font-inter text-sm leading-relaxed text-[#6B6B80]'>
					{loading.text || 'Please wait while we finish this up.'}
				</p>
			</div>
		</div>
	)
}
