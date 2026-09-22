import { zodResolver } from '@hookform/resolvers/zod/dist/zod.js'
import { Paperclip, Send } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import {
	sendAMessageSchema,
	type SendAMessageInput,
	type SendAMessageType,
} from '../../../../schemas/main/sendAMessage'

export default function SendAMessage() {
	const [image, setImage] = useState<File | undefined>(undefined)
	const [imagePreview, setImagePreview] = useState<string | undefined>(
		undefined,
	)
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
		if (!image) {
			setImagePreview(undefined)
			return
		}

		const previewUrl = URL.createObjectURL(image)
		setImagePreview(previewUrl)

		return () => URL.revokeObjectURL(previewUrl)
	}, [image])

	const onSubmit: SubmitHandler<SendAMessageType> = data => {
		console.log(data)
	}
	const clearImage = () => {
		setImage(undefined)
		setValue('image', undefined, { shouldValidate: true })
		if (fileInputRef.current) fileInputRef.current.value = ''
	}
	const { ref: registerImageRef, ...imageInput } = register('image')

	return (
		<div className='p-4 shrink-0 flex flex-col w-full gap-4 border-t border-gray-700/60'>
			{imagePreview && (
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
					>
						x
					</button>
				</div>
			)}
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

						if (!file || !file.type.startsWith('image/')) {
							clearImage()
							return
						}

						setImage(file)
						imageInput.onChange(event)
					}}
					type='file'
					accept='image/*'
					className='hidden'
					id='fileInput'
				/>
				<label htmlFor='fileInput'>
					<Paperclip className='hover:text-white cursor-pointer transition' />
				</label>
				<input
					type='text'
					autoComplete='off'
					placeholder='Message...'
					{...register('message')}
					className='flex-1 text-white bg-transparent text-md py-2 focus-visible:outline-none!'
				/>
				<button onClick={() => console.log('clicked')} type='submit'>
					<Send className='hover:text-white cursor-pointer transition' />
				</button>
			</form>
		</div>
	)
}
