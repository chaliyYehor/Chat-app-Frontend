import { zodResolver } from '@hookform/resolvers/zod/dist/zod.js'
import heic2any from 'heic2any'
import { Image, Send } from 'lucide-react'
import {
	useEffect,
	useRef,
	useState,
	type Dispatch,
	type SetStateAction,
} from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import {
	sendAMessageSchema,
	type SendAMessageInput,
	type SendAMessageType,
} from '../../../../schemas/main/sendAMessage'
import { getConvertedImage } from '../../../../api/getConvertedImage'
import { socket } from '../../../../socket'
import { deleteUploadedImage } from '../../../../api/deleteUploadedImage'
import { useQueryClient } from '@tanstack/react-query'
import type { AppDispatch } from '../../../../store/store'
import { useDispatch } from 'react-redux'
import { setPopUpError } from '../../../../store/slices/popUpSlice'
import { useTypeSound } from '../../../../hooks/useTypeSound'
import { useGetUserPreferences } from '../../../../hooks/useGetUserPreferences'

const isImageFile = (file: File) =>
	file.type.startsWith('image/') || /\.(heic|heif)$/i.test(file.name)

const isHeicFile = (file: File) => /\.(heic|heif)$/i.test(file.name)

interface Props {
	chatId: string
	lastMessageAt?: Date
	isTyping: boolean
	setIsTyping: Dispatch<SetStateAction<boolean>>
}

export default function SendAMessage({
	chatId,
	lastMessageAt,
	isTyping,
	setIsTyping,
}: Props) {
	const [image, setImage] = useState<File | undefined>(undefined)
	const [imagePreview, setImagePreview] = useState<string | undefined>(
		undefined,
	)

	const dispatch = useDispatch<AppDispatch>()

	const [imagePreviewError, setImagePreviewError] = useState(false)
	const [isImageUploading, setIsImageUploading] = useState(false)
	const [uploadedImage, setUploadedImage] = useState<{
		imageUrl: string
		imagePublicId: string
	}>()
	const fileInputRef = useRef<HTMLInputElement>(null)
	const uploadRequestRef = useRef(0)

	const { register, handleSubmit, reset, setValue } = useForm<
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

	const resetAfterSend = () => {
		uploadRequestRef.current += 1
		setImage(undefined)
		setUploadedImage(undefined)
		setIsImageUploading(false)
		setImagePreview(undefined)
		setImagePreviewError(false)
		reset({
			message: '',
			image: undefined,
		})
		if (fileInputRef.current) fileInputRef.current.value = ''
	}

	const queryClient = useQueryClient()

	const onSubmit: SubmitHandler<SendAMessageType> = async data => {
		if (isImageUploading || (data.image && !uploadedImage)) {
			return
		}

		socket.emit(
			'message:send',
			{
				type: uploadedImage && !data.message ? 'image' : 'text_or_image',
				text: data.message.trim() || undefined,
				imageUrl: uploadedImage?.imageUrl ?? undefined,
				imagePubId: uploadedImage?.imagePublicId ?? undefined,
				conversationId: chatId,
				lastMessageAt: lastMessageAt ?? new Date(),
			},
			({ success, error }: { success: boolean; error?: string }) => {
				if (!success) {
					console.error('Failed to send message:', error)
					dispatch(
						setPopUpError({
							heading: 'Error',
							text: 'Failed to send message. Please try again.',
						}),
					)
					return
				}

				queryClient.invalidateQueries({
					queryKey: ['sharedMedia', { chatId }],
				})
				stopTyping()
				resetAfterSend()
				console.log('Message sent successfully')
			},
		)
	}
	const clearImage = async () => {
		const publicId = uploadedImage?.imagePublicId

		uploadRequestRef.current += 1
		setImage(undefined)
		setUploadedImage(undefined)
		setIsImageUploading(false)
		setImagePreview(undefined)
		setImagePreviewError(false)
		setValue('image', undefined, { shouldValidate: true })
		if (fileInputRef.current) fileInputRef.current.value = ''

		if (publicId) {
			try {
				await deleteUploadedImage(publicId)
			} catch (error) {
				console.error('Failed to delete image:', error)
			}
		}
	}
	const { ref: registerImageRef, ...imageInput } = register('image')
	const messageInput = register('message')
	const stopTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

	function stopTyping() {
		clearTimeout(stopTimer.current)
		stopTimer.current = undefined
		setIsTyping(false)
		socket.volatile.emit('typing:stop', { chatId })
	}

	const { data: preferences, isError: isPreferencesError } =
		useGetUserPreferences()

	useEffect(() => {
		if (isPreferencesError) {
			dispatch(
				setPopUpError({
					heading: 'Error',
					text: 'Failed to fetch user preferences. Please try again.',
				}),
			)
		}
	}, [isPreferencesError, dispatch])
	const playTypeSound = useTypeSound()

	return (
		<div className='p-4 shrink-0 mt-2 flex flex-col w-full gap-4 border-t border-gray-700/60'>
			{imagePreview ? (
				<div className='relative w-fit'>
					<img
						className='max-w-40 max-h-40 object-cover rounded-xl border border-white/50'
						src={imagePreview}
						alt='preview'
					/>
					{isImageUploading && (
						<div className='absolute inset-0 flex items-center justify-center rounded-xl bg-black/50'>
							<div
								className='loader'
								role='status'
								aria-label='Uploading image'
							/>
						</div>
					)}
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
				className='messageInput w-full dark:bg-[#1e1e26] bg-[#ebebf0] flex items-center gap-4 rounded-2xl px-4 py-2 text-[#6B6B80]'
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
						setUploadedImage(undefined)
						setImage(file)
						imageInput.onChange(event)

						const uploadRequest = ++uploadRequestRef.current
						setIsImageUploading(true)
						void getConvertedImage(file)
							.then(async response => {
								if (uploadRequest !== uploadRequestRef.current) {
									try {
										await deleteUploadedImage(response.imagePublicId)
									} catch (error) {
										console.error('Failed to delete cancelled upload:', error)
									}

									return
								}

								setUploadedImage({
									imageUrl: response.imageUrl,
									imagePublicId: response.imagePublicId,
								})
							})
							.catch(error => {
								if (uploadRequest !== uploadRequestRef.current) return

								console.error('Failed to upload image:', error)
								setImagePreviewError(true)
							})
							.finally(() => {
								if (uploadRequest !== uploadRequestRef.current) return

								setIsImageUploading(false)
							})
					}}
					type='file'
					accept='image/*,.heic,.heif'
					className='hidden'
					id='fileInput'
					aria-label='Attach an image'
				/>
				<label htmlFor='fileInput' aria-label='Attach an image'>
					<Image
						className='dark:hover:text-white hover:text-black cursor-pointer transition'
						aria-hidden='true'
					/>
				</label>
				<input
					type='text'
					autoComplete='off'
					placeholder='Message...'
					aria-label='Message'
					{...messageInput}
					onChange={event => {
						if (preferences && preferences.typingSounds) {
							playTypeSound()
						}
						messageInput.onChange(event)
						if (!isTyping) {
							setIsTyping(true)
						}
						socket.volatile.emit('typing:start', { chatId })
						clearTimeout(stopTimer.current)
						stopTimer.current = setTimeout(stopTyping, 2500)
					}}
					className='flex-1 dark:text-white bg-transparent text-md py-2 focus-visible:outline-none!'
				/>
				<button
					disabled={isImageUploading}
					type='submit'
					aria-label='Send message'
				>
					<Send
						className='dark:hover:text-white hover:text-black cursor-pointer transition'
						aria-hidden='true'
					/>
				</button>
			</form>
		</div>
	)
}
