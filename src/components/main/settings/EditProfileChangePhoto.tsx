import clsx from 'clsx'
import heic2any from 'heic2any'
import { Camera, Trash2, User } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useGetUserInfo } from '../../../hooks/useGetUserInfo'
import {
	type ChangeUserInfo,
	type ChangeUserInfoInput,
} from '../../../schemas/main/changeUserInfo'
import type { AppDispatch } from '../../../store/store'
import { useDispatch } from 'react-redux'
import { setPopUpError } from '../../../store/slices/popUpSlice'

const MAX_FILE_SIZE = 5 * 1024 * 1024

const isImageFile = (file: File) =>
	file.type.startsWith('image/') || /\.(heic|heif)$/i.test(file.name)

const isHeicFile = (file: File) => /\.(heic|heif)$/i.test(file.name)

export default function EditProfileChangePhoto() {
	const [image, setImage] = useState<File>()
	const [imagePreview, setImagePreview] = useState<string>()
	const [previewError, setPreviewError] = useState<string>()
	const [isPreviewLoading, setIsPreviewLoading] = useState(false)
	const [isImageLoading, setIsImageLoading] = useState(false)
	const [imageLoadError, setImageLoadError] = useState(false)
	const fileInputRef = useRef<HTMLInputElement>(null)
	const selectedImageRef = useRef<File | undefined>(undefined)
	const {
		register,
		setValue,
		setError,
		clearErrors,
		formState: { errors, isSubmitSuccessful },
	} = useFormContext<ChangeUserInfoInput, unknown, ChangeUserInfo>()

	useEffect(() => {
		let previewUrl: string | undefined
		let cancelled = false

		if (!image) {
			setImagePreview(undefined)
			setIsPreviewLoading(false)
			return () => undefined
		}

		setIsPreviewLoading(true)
		setImageLoadError(false)

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
				setIsPreviewLoading(false)
			} catch {
				if (cancelled) return
				setImagePreview(undefined)
				setPreviewError('Preview is not supported for this file')
				setIsPreviewLoading(false)
			}
		}

		void createPreview()

		return () => {
			cancelled = true
			setIsPreviewLoading(false)
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
			selectedImageRef.current = undefined
			setValue('file', undefined, {
				shouldValidate: true,
				shouldDirty: true,
			})
			return
		}

		if (!isImageFile(file)) {
			setImage(undefined)
			selectedImageRef.current = undefined
			setValue('file', undefined, {
				shouldValidate: false,
				shouldDirty: true,
			})
			setError('file', { type: 'validate', message: 'Only images are allowed' })
			return
		}

		if (file.size > MAX_FILE_SIZE) {
			setImage(undefined)
			selectedImageRef.current = undefined
			setValue('file', undefined, {
				shouldValidate: false,
				shouldDirty: true,
			})
			setError('file', { type: 'validate', message: 'Max image size is 5MB' })
			return
		}

		setImage(file)
		selectedImageRef.current = file
		fileInput.onChange(event)
	}

	const handleRemoveSelectedImage = () => {
		setImage(undefined)
		selectedImageRef.current = undefined
		setPreviewError(undefined)
		clearErrors('file')
		setValue('file', undefined, {
			shouldValidate: true,
			shouldDirty: false,
		})

		if (fileInputRef.current) {
			fileInputRef.current.value = ''
		}
	}

	useEffect(() => {
		if (!isSubmitSuccessful || !selectedImageRef.current) return

		setImage(undefined)
		selectedImageRef.current = undefined
		setPreviewError(undefined)
		clearErrors('file')

		if (fileInputRef.current) {
			fileInputRef.current.value = ''
		}
	}, [clearErrors, isSubmitSuccessful])

	const { data: userInfo, isError: isUserInfoError, isPending: isUserInfoLoading } = useGetUserInfo()
	const imageSource = imagePreview ?? userInfo?.imageUrl ?? undefined
	const isLoading = isUserInfoLoading || isPreviewLoading || isImageLoading

	const dispatch = useDispatch<AppDispatch>()

	useEffect(() => {
		if (isUserInfoError) {
			dispatch(
				setPopUpError({
					heading: 'Error',
					text: 'Failed to load user info. Please try again.',
				}),
			)
		}
	}, [isUserInfoError, dispatch])

	return (
		<div className='flex flex-col justify-center md:items-center items-start md:ml-0 ml-20 text-center'>
			<input
				{...fileInput}
				ref={element => {
					registerFileRef(element)
					fileInputRef.current = element
				}}
				onChange={handleFileChange}
				type='file'
				accept='image/*,.heic,.heif'
				className='peer sr-only'
				id='profilePhotoInput'
				aria-label='Choose a profile photo'
			/>
			<div className='relative md:ml-0 ml-3 w-28 h-28 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#00d4aa]'>
				<label
					htmlFor='profilePhotoInput'
					className='relative block h-full w-full cursor-pointer rounded-3xl border dark:border-white/7'
				>
					{imageSource && !imageLoadError ? (
						<>
							{isLoading && (
								<div className='skeleton-shimmer absolute inset-0 rounded-3xl' />
							)}
							<img
								className={clsx(
									'w-full h-full object-cover rounded-3xl',
									isLoading && 'opacity-0',
								)}
								src={imageSource}
								alt='Profile preview'
								onLoad={() => setIsImageLoading(false)}
								onLoadStart={() => setIsImageLoading(true)}
								onError={() => {
									setIsImageLoading(false)
									setImageLoadError(true)
								}}
							/>
						</>
					) : (
						<div
							className={clsx(
								'w-full h-full flex items-center justify-center',
								isLoading && 'skeleton-shimmer',
							)}
						>
							<User size={34} />
						</div>
					)}
					<div className='cameraUI absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center shadow-lg'>
						<Camera color='white' size={16} />
					</div>
				</label>
				{image && (
					<button
						type='button'
						aria-label='Remove selected photo'
						onClick={handleRemoveSelectedImage}
						className='absolute -top-2 -right-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white shadow-md transition-colors hover:bg-red-600'
					>
						<Trash2 size={15} />
					</button>
				)}
			</div>
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
