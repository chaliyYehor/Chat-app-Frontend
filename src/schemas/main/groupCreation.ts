import z from 'zod'

export const groupCreationSchema = z.object({
	groupName: z.string().min(1, 'Group name is required'),
	peopleToAdd: z
		.array(z.object({ id: z.string() }))
		.min(1, 'You need to choose at least one member.'),
})

export type GroupCreation = z.infer<typeof groupCreationSchema>
