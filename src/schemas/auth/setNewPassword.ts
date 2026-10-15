import z from 'zod'

export const setNewPasswordSchema = z.object({
	email: z.email()
})

export type SetNewPassword = z.infer<typeof setNewPasswordSchema>