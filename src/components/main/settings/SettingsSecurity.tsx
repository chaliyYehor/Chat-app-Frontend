import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function SettingsSecurity() {
	return (
		<div className='chatListContainer h-dvh w-full min-w-0 bg-[#16161b]'>
			<div className='upper mb-10 flex flex-col mt-5 gap-2'>
				<Link
					to='/settings'
					className='text-[#6B6B80] w-fit hover:text-white transition-all duration-200 ease-in-out flex justify-center items-center font-inter text-[20px]	gap-2 pl-4'
				>
					<ArrowLeft /> Back
				</Link>
				<div className='flex items-center justify-between px-4 py-2'>
					<h2 className='text-white text-3xl font-bold '>Security</h2>
				</div>
			</div>

			{/* Settings content goes here */}
		</div>
	)
}
