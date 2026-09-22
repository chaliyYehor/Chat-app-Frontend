import z from 'zod'

const MAX_FILE_SIZE = 5 * 1024 * 1024

export const sendAMessageSchema = z.object({
	message: z
		.string()
		.min(1, 'Message is too short')
		.max(1500, 'Message is too long'),
	image: z
		.file()
		.refine(file => file.size <= MAX_FILE_SIZE, {
			message: 'Max image size is 5MB',
		})
		.refine(file => file.type.startsWith('image/'), {
			message: 'Only images are allowed',
		})
		.optional(),
})
