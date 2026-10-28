import { CircleX } from 'lucide-react'
import { useSelector } from 'react-redux'
import type { RootType } from '../store/store'

export default function GlobalSocketError() {
	const globalSocketError = useSelector(
		(state: RootType) => state.socketState.globalSocketError,
	)

	return (
		<div className='w-full flex flex-col justify-center items-center gap-4'>
			<div className='w-18 bg-[#fb2c365c] h-18 flex rounded-xl justify-center items-center'>
				<CircleX size={40} color='#FB2C36' />
			</div>

			<p className='text-md text-[#c52424] leading-relaxed font-inter'>
				{globalSocketError} afdasfasdfasdfasdf
			</p>
		</div>
	)
}
