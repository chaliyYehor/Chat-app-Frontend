import { z } from 'zod'

export const userPreferencesSchema = z.object({
    userId: z.string(),
    typingSounds: z.boolean(),
    messageSounds: z.boolean(),
    readReceipts: z.boolean(),
    lastSeen: z.boolean(),
})

export type UserPreferences = z.infer<typeof userPreferencesSchema>