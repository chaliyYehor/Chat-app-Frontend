import { Button } from '@mui/material'
import { clsx } from 'clsx'
import { Mail, UserRound, X } from 'lucide-react'
import SharedMedia from './chats-page/SharedMedia'

export default function UserInfo({
	setIsProfileOpened,
	isYourProfile,
	sharedMedia,
}: {
	isYourProfile: boolean
	sharedMedia: boolean
	setIsProfileOpened: React.Dispatch<React.SetStateAction<boolean>>
}) {
	return (
		<div
			onClick={() => {
				setIsProfileOpened(false)
			}}
			role='dialog'
			aria-modal='true'
			aria-label={isYourProfile ? 'Your profile' : 'User profile'}
			tabIndex={-1}
			className='fixed w-screen h-dvh cursor-pointer inset-0 bg-black/70 flex items-start justify-center z-50 backdrop-blur-xs'
		>
			<div
				onClick={e => e.stopPropagation()}
				className='relative flex justify-center'
			>
				<div className='cursor-default dark:bg-[#16161B] bg-white w-100 flex flex-col border border-white/30 rounded-t-3xl md:rounded-2xl overflow-hidden animate-fade-in my-20 max-h-142.5'>
					<div className='profileGrad h-25 w-full flex justify-end items-start p-2'>
						<Button
							variant='contained'
							type='button'
							onClick={() => setIsProfileOpened(false)}
							sx={{
								width: 32,
								minWidth: 0,
								height: 32,
								padding: 0,
								borderRadius: '50%',
								display: 'flex',
								boxShadow: 0,
								alignItems: 'center',
								justifyContent: 'center',
								backgroundColor: '#00000055',
								border: 'none',
								color: 'white',
								cursor: 'pointer',
								transition: '0.3s ease',
								'&:hover': {
									backgroundColor: '#00000090',
								},
							}}
							aria-label='Close profile'
						>
							<X size={16} />
						</Button>
					</div>
					<div className=' flex flex-col items-start -mt-10 ml-5 mb-5'>
						<div className='w-20 h-20  dark:bg-[#16161B] bg-white text-white font-bold font-mono text-xl flex justify-center items-center rounded-2xl shadow-lg border dark:border-[#0D0D0D] relative'>
							<img
								className='w-full h-full object-cover rounded-2xl p-1'
								src='/rozvrh.png'
								alt='pfp'
							/>
							{!isYourProfile && (
								<div className='w-3 h-3 bg-green-500 border border-black rounded-[50%] absolute right-1 bottom-1' />
							)}
						</div>
						<div>
							<h2 className='dark:text-[#F0F0F5] font-bold text-xl leading-tight font-inter'>
								Alex Rivera
							</h2>
							<p
								className={clsx(
									!isYourProfile ? 'text-green-500' : '',
									'text-sm font-inter text-[#6B6B80]',
								)}
							>
								{!isYourProfile ? 'Online' : 'Your profile'}
							</p>
						</div>
					</div>
					<div className='w-full px-5 mb-5'>
						<div className='dark:bg-[#1E1E26] bg-[#EBEBF0] w-full flex flex-col gap-1 rounded-2xl p-4'>
							<p className='text-[#6B6B80] font-inter  font-semibold text-[10px]'>
								ABOUT
							</p>
							<p className='dark:text-[#F0F0F5] font-inter'>
								Product designer & coffee enthusiast
							</p>
						</div>
					</div>
					<div className='w-full px-5 text-[#6B6B80] mb-5'>
						<div className='dark:bg-[#1E1E26] bg-[#EBEBF0] w-full flex flex-col rounded-2xl gap-5 overflow-hidden'>
							<div className='w-full p-4 border-b dark:border-black border-gray-600/30'>
								<div className='flex justify-start gap-4 items-center'>
									<Mail size={15} />
									<div>
										<p className='text-[10px] text-[#6B6B80] font-inter font-medium'>
											Email
										</p>
										<p className='text-sm dark:text-[#F0F0F5] text-black font-inter'>
											alex.rivera@pulse.app
										</p>
									</div>
								</div>
							</div>
							<div className='w-full px-4 pb-4 border-b dark:border-black border-gray-600/30'>
								<div className='flex justify-start gap-4 items-center '>
									<UserRound size={15} />
									<div>
										<p className='text-[10px] text-[#6B6B80] font-inter font-medium'>
											Username
										</p>
										<p className='text-sm dark:text-[#F0F0F5] text-black font-inter'>
											@alexrivera
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					{sharedMedia && (
						<div className='flex w-full min-w-0 flex-col items-start px-5 mb-5'>
							<p className='text-[10px] font-semibold text-[#6B6B80] tracking-wider mb-2 font-inter'>
								SHARED MEDIA
							</p>
							<div
								onWheel={event => {
									const scrollDelta = event.deltaX || event.deltaY

									if (scrollDelta !== 0) {
										event.preventDefault()
										event.currentTarget.scrollBy({
											left: scrollDelta,
											behavior: 'auto',
										})
									}
								}}
								className='sharedMedia flex w-full min-w-0 max-w-full touch-pan-x overscroll-x-contain flex-nowrap gap-3 overflow-x-auto select-none'
							>
								<SharedMedia src='/rozvrh.png' />
								<SharedMedia src='/rozvrh.png' />
								<SharedMedia src='/rozvrh.png' />
								<SharedMedia src='/rozvrh.png' />
								<SharedMedia src='/rozvrh.png' />
								<SharedMedia src='/rozvrh.png' />
								<SharedMedia src='/rozvrh.png' />
								<SharedMedia src='/rozvrh.png' />
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
