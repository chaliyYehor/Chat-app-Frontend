import { Link } from 'react-router-dom'
import Avatar from '../../Avatar'

export default function Person() {
	return (
		<Link
			to={'#'}
			className='chatPreview w-full h-17.5 flex justify-center items-center gap-3 hover:bg-[#1e1e26] p-2 rounded-lg transition-all duration-200 ease-in-out'
		>
			<Avatar />
			<div className='flex-1 min-w-0 flex flex-col items-start text-white'>
				<p className='truncate max-w-[60%] font-semibold'>Sofia Chen</p>
				<p className='text-[#6B6B80] text-sm font-inter text-[12px]'>Online</p>
			</div>
		</Link>
	)
}
