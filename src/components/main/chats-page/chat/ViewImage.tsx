import type { Dispatch, SetStateAction } from 'react'

interface Props {
	src: string
	alt: string
	setShowPreview: Dispatch<SetStateAction<boolean>>
}

export default function ViewImage({ src, alt, setShowPreview }: Props) {
	return (
		<button
			onClick={() => setShowPreview(false)}
			className='fixed w-screen h-dvh cursor-pointer inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-xs'
		>
			<div className='relative flex justify-center'>
				<img
					className='max-w-[80%] max-h-full object-contain'
					src={src}
					alt={alt}
				/>
			</div>
		</button>
	)
}
