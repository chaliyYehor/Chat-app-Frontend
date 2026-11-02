import { Button } from '@mui/material'
import { Edit, X } from 'lucide-react'
import GroupPfp from './GroupPfp'
import { useAccessibleDialog } from '../../../../hooks/useAccessibleDialog'
import type { GroupResponse } from '../../../../schemas/main/getGroupsResponse'
import { useGetGroupMembers } from '../../../../hooks/useGetGroupMembers'
import { setPopUpError } from '../../../../store/slices/popUpSlice'
import { useEffect, useState } from 'react'
import type { AppDispatch } from '../../../../store/store'
import { useDispatch } from 'react-redux'
import Person from '../chat/Person'
import { socket } from '../../../../socket'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { authClient } from '../../../../lib/auth-client'
import clsx from 'clsx'

export default function GroupInfo({
	setIsProfileOpened,
	groupInfo,
}: {
	setIsProfileOpened: React.Dispatch<React.SetStateAction<boolean>>
	groupInfo: GroupResponse
}) {
	const [value, setValue] = useState('')

	const dialogRef = useAccessibleDialog(() => setIsProfileOpened(false))

	const {
		data: groupMembers,
		isPending: isGroupMembersLoading,
		isError: isGroupMembersError,
	} = useGetGroupMembers(groupInfo.group.id)

	const dispatch = useDispatch<AppDispatch>()

	useEffect(() => {
		setValue(groupInfo.group.groupDescription || '...')
	}, [groupInfo])

	useEffect(() => {
		if (isGroupMembersError) {
			dispatch(
				setPopUpError({
					heading: 'Error',
					text: 'Failed to load group members. Please try again.',
				}),
			)
		}
	}, [isGroupMembersError, dispatch])

	const queryClient = useQueryClient()

	const navigate = useNavigate()

	const userId = authClient.useSession().data?.user.id

	useEffect(() => {
		const handleMemberLeft = (data: { groupId: string }) => {
			if (data.groupId !== groupInfo.group.id) return

			void queryClient.invalidateQueries({
				queryKey: ['groupMembers', groupInfo.group.id],
			})
			void queryClient.invalidateQueries({ queryKey: ['groups'] })
		}

		socket.on('group:member-left', handleMemberLeft)
		return () => {
			socket.off('group:member-left', handleMemberLeft)
		}
	}, [groupInfo.group.id, queryClient])

	function handleDescriptionBlur() {
		const description = value.trim()

		if (description === (groupInfo.group.groupDescription || '')) return

		socket.emit(
			'group:update-description',
			{ groupId: groupInfo.group.id, description },
			({ success }: { success: boolean; error?: string }) => {
				if (!success) {
					dispatch(
						setPopUpError({
							heading: 'Error',
							text: 'Failed to update group description. Please try again.',
						}),
					)
					return
				}

				void queryClient.invalidateQueries({ queryKey: ['groups'] })
			},
		)
	}
	return (
		<>
			<div
				ref={dialogRef}
				onClick={() => {
					setIsProfileOpened(false)
				}}
				role='dialog'
				aria-modal='true'
				aria-label='Group information'
				tabIndex={-1}
				className='fixed w-screen h-dvh cursor-pointer inset-0 bg-black/70 flex md:items-start justify-center z-50 backdrop-blur-xs'
			>
				<div
					onClick={e => e.stopPropagation()}
					className='relative flex justify-center'
				>
					<div className='cursor-default bg-[#16161B] md:w-100 flex flex-col border border-white/30 rounded-t-3xl md:rounded-2xl overflow-hidden animate-fade-in my-20 md:max-h-142.5 h-[90vh]'>
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
								aria-label='Close group information'
							>
								<X size={16} />
							</Button>
						</div>
						<div className=' flex flex-col items-start -mt-10 ml-5 mb-5'>
							<div className='w-20 h-20  bg-[#16161B] text-white font-bold font-mono text-xl flex justify-center items-center rounded-2xl shadow-lg border border-[#0D0D0D] relative'>
								<GroupPfp groupName={groupInfo.group.groupName} />
							</div>
							<div>
								<h2 className='text-[#F0F0F5] font-bold text-xl leading-tight font-inter'>
									{groupInfo.group.groupName}
								</h2>
								<p className={'text-sm font-inter text-[#6B6B80]'}>
									{groupInfo.group.memberIds.length === 1
										? '1 member'
										: `${groupInfo.group.memberIds.length} members`}
								</p>
							</div>
						</div>
						<div className='w-full px-5 mb-5'>
							<div className='bg-[#1E1E26] w-full flex flex-col gap-1 rounded-2xl p-4'>
								<p className='text-[#6B6B80] flex justify-between font-inter w-full font-semibold text-[10px]'>
									<span>ABOUT</span>
									{groupInfo.groupUser.role === 'admin' && <Edit size={13} />}
								</p>
								{groupInfo.groupUser.role !== 'admin' ? (
									<p className='text-[#F0F0F5] font-inter max-h-30 scrollbar-none overflow-y-auto'>
										{groupInfo.group.groupDescription
											? groupInfo.group.groupDescription
											: '...'}
									</p>
								) : (
									<textarea
										value={value}
										onBlur={handleDescriptionBlur}
										placeholder={value === '...' ? '...' : value}
										onChange={e => setValue(e.target.value)}
										className='placeholder:text-[#F0F0F5] w-full max-h-30 resize-none overflow-y-auto font-inter text-[#F0F0F5] bg-[#1E1E26]'
									></textarea>
								)}
							</div>
						</div>
						<div className='w-full px-5 text-[#6B6B80] mb-5 flex-1 overflow-y-auto scrollbar-none flex flex-col gap-2'>
							<div className='bg-[#1E1E26] w-full flex flex-col justify-center items-center rounded-2xl px-2 py-1'>
								{isGroupMembersLoading &&
									!groupMembers &&
									Array(4)
										.fill('')
										.map((_, idx) => (
											<div
												key={idx}
												className='h-8 w-[95%] my-2 rounded-xl skeleton-shimmer'
											/>
										))}
								{groupMembers &&
									groupMembers.map(member => {
										const user = {
											userId: member.userId,
											name: member.name,
											imageUrl: member.imageUrl,
											status: member.status,
											previouslySetStatus: member.previouslySetStatus,
										}

										return (
											<Person
												key={member.userId}
												isMe={userId === member.userId}
												setIsAdding={() => {
													if (userId === member.userId) return
													socket.emit(
														'chat:create-chat',
														{ userId: member.userId },
														async ({
															success,
															error,
															conversationId,
														}: {
															success: boolean
															error?: string
															conversationId?: string
														}) => {
															if (success) {
																await queryClient.invalidateQueries({
																	queryKey: ['chats'],
																})
																setIsProfileOpened(false)
																navigate(`/chats/${conversationId}`)
															}
															if (error) {
																if (error.includes('already exists')) {
																	setIsProfileOpened(false)
																	navigate(`/chats/${conversationId}`)
																} else {
																	dispatch(
																		setPopUpError({
																			heading: 'Error',
																			text: 'Failed to create chat. Please try again.',
																		}),
																	)
																}
															}
														},
													)
												}}
												isListItem
												user={user}
												className={clsx(
													userId === member.userId ? 'pointer-events-none' : '',
													'w-full px-4 py-2 border-b border-black flex justify-center items-center',
												)}
											/>
										)
									})}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
