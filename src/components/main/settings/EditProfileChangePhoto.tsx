import { Camera } from 'lucide-react'

export default function EditProfileChangePhoto() {
	return (
		<div className='flex flex-col justify-center items-center text-center'>
			<button
				type='button'
				className='w-28 h-28 cursor-pointer relative rounded-3xl border border-white/7'
			>
				<img
					className='w-full h-full object-cover rounded-3xl'
					src='/rozvrh.png'
					alt='pfp'
				/>
				<div className='absolute cameraUI -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center shadow-lg'>
					<Camera color='white' size={16} />
				</div>
			</button>
			<p className='text-[#6B6B80] text-sm mt-3 font-inter font-normal'>Tap to change photo</p>
		</div>
	)
}
