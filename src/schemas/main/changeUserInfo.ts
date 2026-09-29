import z from 'zod'

const MAX_FILE_SIZE = 5 * 1024 * 1024

const isImageFile = (file: File) =>
	file.type.startsWith('image/') || /\.(heic|heif)$/i.test(file.name)

export const changeUserInfoSchema = z
	.object({
		status: z.enum(['online', 'away', 'offline']).optional(),
		displayName: z
			.string()
			.min(1, 'Display name is required')
			.max(50, 'Display name must be at most 50 characters')
			.optional(),
		username: z
			.string()
			.min(1, 'Username is required')
			.max(30, 'Username must be at most 30 characters')
			.optional(),
		bio: z.string().max(160, 'Bio must be at most 160 characters').optional(),
		email: z.string().email('Invalid email address').optional(),
		file: z
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
	.refine(data => Object.values(data).some(value => value !== undefined), {
		message: 'At least one profile field is required',
	})

export type ChangeUserInfo = z.infer<typeof changeUserInfoSchema>
export type ChangeUserInfoInput = z.input<typeof changeUserInfoSchema>
