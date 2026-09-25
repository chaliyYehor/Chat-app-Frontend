import z from 'zod'

export const forgotPasswordSchema = z.object({
	email: z.email()
})

export type ForgotPasswordType = z.infer<typeof forgotPasswordSchema>