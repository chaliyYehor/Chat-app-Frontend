import { Button } from '@mui/material'
import { X } from 'lucide-react'
import Person from '../chat/Person'
import GroupPfp from './GroupPfp'

export default function GroupInfo({
	setIsProfileOpened,
}: {
	setIsProfileOpened: React.Dispatch<React.SetStateAction<boolean>>
}) {
	return (
		<div
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
							<GroupPfp />
						</div>
						<div>
							<h2 className='text-[#F0F0F5] font-bold text-xl leading-tight font-inter'>
								Design Team
							</h2>
							<p className={'text-sm font-inter text-[#6B6B80]'}>4 members</p>
						</div>
					</div>
					<div className='w-full px-5 mb-5'>
						<div className='bg-[#1E1E26] w-full flex flex-col gap-1 rounded-2xl p-4'>
							<p className='text-[#6B6B80] font-inter  font-semibold text-[10px]'>
								ABOUT
							</p>
							<p className='text-[#F0F0F5] font-inter max-h-30 scrollbar-none overflow-y-auto'>
								Engineering updates, releases, and technical
								discussions.Engineering updates, releases, and technical
								discussions.Engineering updates, releases, and technical
								discussions.Engineering updates, releases, and technical
								discussions.Engineering updates, releases, and technical
								discussions.Engineering updates, releases, and technical
								discussions.
							</p>
						</div>
					</div>
					<div className='w-full px-5 text-[#6B6B80] mb-5 flex-1 overflow-y-auto scrollbar-none flex flex-col gap-2'>
						<div className='bg-[#1E1E26] w-full flex flex-col justify-center items-center rounded-2xl '>
							<div className='w-full px-4 py-2 border-b border-black flex justify-center items-center'>
								{/* <Person setIsAdding={setIsProfileOpened} isListItem /> */}
							</div>
							<div className='w-full px-4 py-2 border-b border-black flex justify-center items-center'>
								{/* <Person setIsAdding={setIsProfileOpened} isListItem /> */}
							</div>
							<div className='w-full px-4 py-2 border-b border-black flex justify-center items-center'>
								{/* <Person setIsAdding={setIsProfileOpened} isListItem /> */}
							</div>
							<div className='w-full px-4 py-2 border-b border-black flex justify-center items-center'>
								{/* <Person setIsAdding={setIsProfileOpened} isListItem /> */}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
