import z from 'zod'

const MAX_FILE_SIZE = 5 * 1024 * 1024

const isImageFile = (file: File) =>
	file.type.startsWith('image/') || /\.(heic|heif)$/i.test(file.name)

export const sendAMessageSchema = z
	.object({
		message: z.string().max(1500, 'Message is too long'),
		image: z
			.preprocess(
				value =>
					value instanceof FileList ? (value.item(0) ?? undefined) : value,
				z
					.file()
					.refine(file => file.size <= MAX_FILE_SIZE, {
						message: 'Max image size is 5MB',
					})
					.refine(isImageFile, {
						message: 'Only images are allowed',
					}),
			)
			.optional(),
	})
	.refine(data => Boolean(data.message?.trim() || data.image), {
		message: 'Message or image is required',
		path: ['message'],
	})

export type SendAMessageType = z.infer<typeof sendAMessageSchema>
export type SendAMessageInput = z.input<typeof sendAMessageSchema>
