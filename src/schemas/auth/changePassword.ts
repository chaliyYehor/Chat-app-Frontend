import z from 'zod'

export const changePasswordSchema = z.object({
	currentPassword: z.string().min(8, 'Current password must be at least 8 characters long'),
	password: z.string().min(8, 'Password must be at least 8 characters long'),
	confirmPassword: z.string(),
})
.refine((data) => data.password === data.confirmPassword, {
	message: "Passwords do not match",
	path: ["confirmPassword"],
});

export type ChangePasswordType = z.infer<typeof changePasswordSchema>
