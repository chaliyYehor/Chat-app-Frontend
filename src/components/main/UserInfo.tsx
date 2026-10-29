import { Button } from '@mui/material'
import { clsx } from 'clsx'
import { Mail, User, UserRound, X } from 'lucide-react'
import SharedMedia from './chats-page/SharedMedia'
import { authClient } from '../../lib/auth-client'
import type { UserProfile } from '../../schemas/main/userProfile'
import type { GetUserInfoChat } from '../../schemas/main/getUserInfoChat'
import { getDisplayedStatus } from '../../lib/getDisplayedStatus'
import { formatLastSeen } from '../../lib/formatLastSeen'
import { useGetSharedMedia } from '../../hooks/useGetSharedMedia'
import { useEffect } from 'react'
import { setPopUpError } from '../../store/slices/popUpSlice'
import type { AppDispatch } from '../../store/store'
import { useDispatch } from 'react-redux'
import { useAccessibleDialog } from '../../hooks/useAccessibleDialog'

type DisplayedUserInfo = UserProfile | GetUserInfoChat

export default function UserInfo({
	setIsProfileOpened,
	isYourProfile,
	sharedMedia,
	userInfo,
	chatId,
	email,
	isFetching,
}: {
	isYourProfile: boolean
	sharedMedia: boolean
	chatId?: string
	isFetching?: boolean
	email?: string
	userInfo?: DisplayedUserInfo
	setIsProfileOpened: React.Dispatch<React.SetStateAction<boolean>>
}) {
	const { data } = authClient.useSession()
	const displayedEmail =
		email ??
		(userInfo && 'email' in userInfo ? userInfo.email : data?.user?.email)

	const colors = {
		online: { text: '#00D4AA', bg: '#00D4AA' },
		away: { text: '#F59E0B', bg: '#F59E0B' },
		offline: { text: '#6B6B80', bg: '#6B6B80' },
	}

	const {
		data: sharedMediaData,
		isError: isSharedMediaError,
		isPending: isSharedMediaLoading,
	} = useGetSharedMedia({
		chatId: chatId ?? '',
		otherUserId: userInfo?.userId ?? '',
		enabled: sharedMedia,
	})

	const dispatch = useDispatch<AppDispatch>()
	const dialogRef = useAccessibleDialog(() => setIsProfileOpened(false))

	useEffect(() => {
		if (isSharedMediaError) {
			dispatch(
				setPopUpError({
					heading: 'Error',
					text: 'Failed to load shared media. Please try again.',
				}),
			)
		}
	}, [isSharedMediaError])
	return (
		<div
			ref={dialogRef}
			onClick={() => {
				setIsProfileOpened(false)
			}}
			role='dialog'
			aria-modal='true'
			aria-label={isYourProfile ? 'Your profile' : 'User profile'}
			tabIndex={-1}
			className='fixed w-screen h-dvh cursor-pointer inset-0 bg-black/70 flex md:items-start justify-center z-50 backdrop-blur-xs'
		>
			<div
				onClick={e => e.stopPropagation()}
				className='relative flex justify-center '
			>
				<div className='cursor-default dark:bg-[#16161B] bg-white w-90 flex flex-col border border-white/30 rounded-2xl overflow-y-auto scrollbar-none overflow-hidden animate-fade-in md:my-15 my-0 md:max-h-142.5 h-[90vh] pb-3 md:pb-0'>
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
							{userInfo && !isFetching && userInfo.imageUrl ? (
								<img
									className='w-full h-full object-cover rounded-2xl p-1'
									src={userInfo.imageUrl}
									alt='pfp'
								/>
							) : (
								<div className='w-full h-full flex items-center justify-center'>
									<User size={34} />
								</div>
							)}
							{!isYourProfile && (
								<div
									style={{
										backgroundColor:
											colors[
												getDisplayedStatus(
													userInfo?.status,
													userInfo?.previouslySetStatus,
												)
											]?.bg,
									}}
									className='w-3 h-3 border border-black rounded-[50%] absolute right-1 bottom-1'
								/>
							)}
						</div>
						<div className='w-full pr-5 '>
							<div
								className={clsx(
									isFetching ? 'skeleton-shimmer' : '',
									'w-full min-h-fit h-5 rounded-2xl mb-2',
								)}
							>
								<h2 className='dark:text-[#F0F0F5] font-bold text-xl leading-tight font-inter'>
									{userInfo && !isFetching ? userInfo.name : ''}
								</h2>
							</div>
							<p
								style={{
									color: isYourProfile
										? '#6B6B80'
										: colors[
												getDisplayedStatus(
													userInfo?.status,
													userInfo?.previouslySetStatus,
												)
											]?.text,
								}}
								className={clsx(
									!isYourProfile ? 'text-green-500' : '',
									'text-sm font-inter text-[#6B6B80] capitalize',
								)}
							>
								{userInfo &&
									userInfo.lastSeen &&
									userInfo.status === 'offline' &&
									'Last seen: '}
								{!isYourProfile
									? userInfo?.status === 'offline' && userInfo.lastSeen
										? formatLastSeen(userInfo.lastSeen)
										: getDisplayedStatus(
												userInfo?.status,
												userInfo?.previouslySetStatus,
											)
									: 'Your profile'}
							</p>
						</div>
					</div>
					<div className='w-full px-5 mb-5'>
						<div className='dark:bg-[#1E1E26] bg-[#EBEBF0] w-full flex flex-col gap-1 rounded-2xl p-4'>
							<p className='text-[#6B6B80] font-inter  font-semibold text-[10px]'>
								ABOUT
							</p>
							<p
								className={clsx(
									isFetching ? 'skeleton-shimmer' : '',
									'dark:text-[#F0F0F5] font-inter w-full min-h-7 rounded-xl',
								)}
							>
								{userInfo && !isFetching ? userInfo.about : ''}
								{!userInfo?.about && !isFetching && '...'}
							</p>
						</div>
					</div>
					<div className='w-full px-5 text-[#6B6B80] mb-5'>
						<div className='dark:bg-[#1E1E26] bg-[#EBEBF0] w-full flex flex-col rounded-2xl gap-5 overflow-hidden'>
							<div className='w-full p-4 border-b dark:border-black border-gray-600/30'>
								<div className='flex justify-start gap-4 items-center'>
									<Mail size={15} />
									<div
										className={clsx(
											isFetching ? 'skeleton-shimmer' : '',
											'w-full min-h-10 rounded-xl',
										)}
									>
										<p className='text-[10px] text-[#6B6B80] font-inter font-medium'>
											{isFetching ? '' : 'Email'}
										</p>
										<p className='text-sm dark:text-[#F0F0F5] text-black font-inter'>
											{displayedEmail && !isFetching
												? `@${displayedEmail}`
												: ''}
										</p>
									</div>
								</div>
							</div>
							<div className='w-full px-4 pb-4 border-b dark:border-black border-gray-600/30'>
								<div className='flex justify-start gap-4 items-center '>
									<UserRound size={15} />
									<div
										className={clsx(
											isFetching ? 'skeleton-shimmer' : '',
											'w-full min-h-10 rounded-xl',
										)}
									>
										<p className='text-[10px] text-[#6B6B80] font-inter font-medium'>
											{isFetching ? '' : 'User ID'}
										</p>
										<p className='text-sm dark:text-[#F0F0F5] text-black font-inter'>
											{userInfo && !isFetching ? '@' + userInfo.userPubId : ''}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					{isSharedMediaLoading && (
						<div className='w-full h-20 flex justify-center items-center'>
							<div className='loader dark:bg-white bg-black' role='status' aria-label='Loading shared media' />
						</div>
					)}
					{sharedMediaData &&
						sharedMediaData.length > 0 &&
						!isSharedMediaLoading && (
							<div className='flex w-full min-w-0 flex-col items-start px-5 mb-5'>
								<p className='text-[10px] font-semibold text-[#6B6B80] tracking-wider mb-2 font-inter'>
									SHARED MEDIA
								</p>
								<div
									onWheel={event => {
										event.stopPropagation()

										if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
											event.preventDefault()
											event.currentTarget.scrollLeft += event.deltaY
										}
									}}
									className='sharedMedia flex w-full min-w-0 max-w-full touch-pan-x overscroll-contain flex-nowrap gap-3 overflow-x-auto select-none'
								>
									{sharedMediaData.map(media => (
										<SharedMedia key={media.id} src={media.imageUrl} />
									))}
								</div>
							</div>
						)}
				</div>
			</div>
		</div>
	)
}
