import { zodResolver } from '@hookform/resolvers/zod/dist/zod.js'
import heic2any from 'heic2any'
import { Camera } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useForm, useFormContext } from 'react-hook-form'
import {
	changeUserInfoSchema,
	type ChangeUserInfo,
	type ChangeUserInfoInput,
} from '../../../schemas/main/changeUserInfo'

const MAX_FILE_SIZE = 5 * 1024 * 1024

const isImageFile = (file: File) =>
	file.type.startsWith('image/') || /\.(heic|heif)$/i.test(file.name)

const isHeicFile = (file: File) => /\.(heic|heif)$/i.test(file.name)

export default function EditProfileChangePhoto() {
	const [image, setImage] = useState<File>()
	const [imagePreview, setImagePreview] = useState<string>()
	const [previewError, setPreviewError] = useState<string>()
	const fileInputRef = useRef<HTMLInputElement>(null)
	const {
		register,
		setValue,
		setError,
		clearErrors,
		formState: { errors },
	} = useFormContext<ChangeUserInfoInput, unknown, ChangeUserInfo>()

	useEffect(() => {
		let previewUrl: string | undefined
		let cancelled = false

		if (!image) {
			setImagePreview(undefined)
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
				setPreviewError(undefined)
			} catch {
				if (cancelled) return
				setImagePreview(undefined)
				setPreviewError('Preview is not supported for this file')
			}
		}

		void createPreview()

		return () => {
			cancelled = true
			if (previewUrl) URL.revokeObjectURL(previewUrl)
		}
	}, [image])

	const { ref: registerFileRef, ...fileInput } = register('file')

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		setPreviewError(undefined)
		clearErrors('file')

		if (!file) {
			setImage(undefined)
			setValue('file', undefined, { shouldValidate: true })
			return
		}

		if (!isImageFile(file)) {
			setImage(undefined)
			setValue('file', undefined, { shouldValidate: false })
			setError('file', { type: 'validate', message: 'Only images are allowed' })
			return
		}

		if (file.size > MAX_FILE_SIZE) {
			setImage(undefined)
			setValue('file', undefined, { shouldValidate: false })
			setError('file', { type: 'validate', message: 'Max image size is 5MB' })
			return
		}

		setImage(file)
		fileInput.onChange(event)
	}

	return (
		<div className='flex flex-col justify-center items-center text-center'>
			<input
				{...fileInput}
				ref={element => {
					registerFileRef(element)
					fileInputRef.current = element
				}}
				onChange={handleFileChange}
				type='file'
				accept='image/*,.heic,.heif'
				className='hidden'
				id='profilePhotoInput'
			/>
			<label
				htmlFor='profilePhotoInput'
				className='relative block w-28 h-28 cursor-pointer rounded-3xl border border-white/7'
			>
				<img
					className='w-full h-full object-cover rounded-3xl'
					src={imagePreview ?? '/rozvrh.png'}
					alt='Profile preview'
				/>
				<div className='cameraUI absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center shadow-lg'>
					<Camera color='white' size={16} />
				</div>
			</label>
			<p className='text-[#6B6B80] text-sm mt-3 font-inter font-normal'>
				Tap to change photo
			</p>
			{(previewError || errors.file?.message) && (
				<p className='mt-2 text-sm text-red-400'>
					{previewError ?? errors.file?.message}
				</p>
			)}
		</div>
	)
}
