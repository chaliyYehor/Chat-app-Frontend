import { zodResolver } from '@hookform/resolvers/zod/dist/zod.js'
import heic2any from 'heic2any'
import { Image, Send } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import {
	sendAMessageSchema,
	type SendAMessageInput,
	type SendAMessageType,
} from '../../../../schemas/main/sendAMessage'

const isImageFile = (file: File) =>
	file.type.startsWith('image/') || /\.(heic|heif)$/i.test(file.name)

const isHeicFile = (file: File) => /\.(heic|heif)$/i.test(file.name)

export default function SendAMessage() {
	const [image, setImage] = useState<File | undefined>(undefined)
	const [imagePreview, setImagePreview] = useState<string | undefined>(
		undefined,
	)
	const [imagePreviewError, setImagePreviewError] = useState(false)
	const fileInputRef = useRef<HTMLInputElement>(null)

	const { register, handleSubmit, setValue } = useForm<
		SendAMessageInput,
		unknown,
		SendAMessageType
	>({
		resolver: zodResolver(sendAMessageSchema),
		defaultValues: {
			message: '',
			image: undefined,
		},
	})
	useEffect(() => {
		let previewUrl: string | undefined
		let cancelled = false

		if (!image) {
			return () => undefined
		}

		const createPreview = async () => {
			try {
				let previewBlob: Blob = image

				if (isHeicFile(image)) {
					const converted = await heic2any({
						blob: image,
						toType: 'image/jpeg',
						quality: 0.8,
					})
					previewBlob = Array.isArray(converted) ? converted[0] : converted
				}

				if (cancelled) return
				previewUrl = URL.createObjectURL(previewBlob)
				setImagePreview(previewUrl)
			} catch {
				if (cancelled) return
				setImagePreview(undefined)
				setImagePreviewError(true)
			}
		}

		void createPreview()

		return () => {
			cancelled = true
			if (previewUrl) URL.revokeObjectURL(previewUrl)
		}
	}, [image])

	const onSubmit: SubmitHandler<SendAMessageType> = data => {
		console.log(data)
	}
	const clearImage = () => {
		setImage(undefined)
		setImagePreview(undefined)
		setImagePreviewError(false)
		setValue('image', undefined, { shouldValidate: true })
		if (fileInputRef.current) fileInputRef.current.value = ''
	}
	const { ref: registerImageRef, ...imageInput } = register('image')

	return (
		<div className='p-4 shrink-0 flex flex-col w-full gap-4 border-t border-gray-700/60'>
			{imagePreview ? (
				<div className='relative w-fit'>
					<img
						className='max-w-40 max-h-40 object-cover rounded-xl border border-white/50'
						src={imagePreview}
						alt='preview'
					/>
					<button
						onClick={clearImage}
						type='button'
						className='bg-white text-black cursor-pointer w-5 h-5 flex justify-center items-center rounded-2xl absolute top-0 right-0'
						aria-label='Remove image'
					>
						x
					</button>
				</div>
			) : imagePreviewError && image ? (
				<div className='relative max-w-40 rounded-xl border border-white/50 bg-[#1e1e26] p-3 text-white'>
					<p className='truncate text-sm'>{image.name}</p>
					<p className='mt-1 text-xs text-[#6B6B80]'>
						Preview is not supported for this HEIC file
					</p>
					<button
						onClick={clearImage}
						type='button'
						className='absolute right-1 top-1 flex h-5 w-5 cursor-pointer items-center justify-center rounded-2xl bg-white text-black'
						aria-label='Remove image'
					>
						x
					</button>
				</div>
			) : null}
			<form
				onSubmit={handleSubmit(onSubmit, errors => console.log(errors))}
				className='messageInput w-full bg-[#1e1e26] flex items-center gap-4 rounded-2xl px-4 py-2 text-[#6B6B80]'
			>
				<input
					{...imageInput}
					ref={element => {
						registerImageRef(element)
						fileInputRef.current = element
					}}
					onChange={event => {
						const file = event.target.files?.[0]

						if (!file || !isImageFile(file)) {
							clearImage()
							return
						}

						setImagePreviewError(false)
						setImage(file)
						imageInput.onChange(event)
					}}
					type='file'
					accept='image/*,.heic,.heif'
					className='hidden'
					id='fileInput'
					aria-label='Attach an image'
				/>
				<label htmlFor='fileInput' aria-label='Attach an image'>
					<Image
						className='hover:text-white cursor-pointer transition'
						aria-hidden='true'
					/>
				</label>
				<input
					type='text'
					autoComplete='off'
					placeholder='Message...'
					aria-label='Message'
					{...register('message')}
					className='flex-1 text-white bg-transparent text-md py-2 focus-visible:outline-none!'
				/>
				<button
					onClick={() => console.log('clicked')}
					type='submit'
					aria-label='Send message'
				>
					<Send
						className='hover:text-white cursor-pointer transition'
						aria-hidden='true'
					/>
				</button>
			</form>
		</div>
	)
}
