import z from 'zod'

export const getSharedMediaSchema = z.array(
	z.object({
		id: z.string().min(1),
		imageUrl: z.url(),
	}),
)

export type GetSharedMedia = z.infer<typeof getSharedMediaSchema>
