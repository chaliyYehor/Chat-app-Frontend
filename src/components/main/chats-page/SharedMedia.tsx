import { useState } from 'react'
import ViewImage from './chat/ViewImage'

export default function SharedMedia({ src }: { src: string }) {
	const [showPreview, setShowPreview] = useState(false)
	return (
		<>
			{showPreview && (
				<ViewImage
					src={src}
					alt='Shared media'
					setShowPreview={setShowPreview}
				/>
			)}
			<button
				type='button'
				onClick={() => setShowPreview(true)}
				className='cursor-pointer w-27.5 h-27.5 overflow-hidden shrink-0 rounded-xl aspect-square hover:opacity-90 transition-opacity'
			>
				<img
					className='w-full h-full object-cover'
					src={src}
					alt='Shared media'
				/>
			</button>
		</>
	)
}
