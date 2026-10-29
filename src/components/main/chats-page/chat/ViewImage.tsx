import type { Dispatch, SetStateAction } from 'react'
import { X } from 'lucide-react'
import { useAccessibleDialog } from '../../../../hooks/useAccessibleDialog'

interface Props {
	src: string
	alt: string
	setShowPreview: Dispatch<SetStateAction<boolean>>
}

export default function ViewImage({ src, alt, setShowPreview }: Props) {
	const dialogRef = useAccessibleDialog(() => setShowPreview(false))
	return (
		<div
			ref={dialogRef}
			onClick={() => setShowPreview(false)}
			role='dialog'
			aria-modal='true'
			aria-label='Image preview'
			tabIndex={-1}
			className='fixed w-screen h-dvh cursor-pointer inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-xs'
		>
			<div className='relative flex justify-center'>
				<img
					className='max-w-[80%] max-h-[90vh] object-contain'
					src={src}
					alt={alt}
				/>
			</div>
			<button
				type='button'
				aria-label='Close image preview'
				className='absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80'
				onClick={() => setShowPreview(false)}
			>
				<X aria-hidden='true' />
			</button>
		</div>
	)
}
