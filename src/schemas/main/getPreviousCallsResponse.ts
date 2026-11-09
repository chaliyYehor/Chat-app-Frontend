import z from 'zod'

const callParticipantSchema = z.object({
	callId: z.string(),
	userId: z.string().nullable(),
	name: z.string(),
	imageUrl: z.string().nullable(),
	role: z.enum(['initiator', 'participant']),
	status: z.enum([
		'outgoing',
		'invited',
		'accepted',
		'declined',
		'missed',
		'joined',
		'left',
	]),
	joinedAt: z.coerce.date().nullable(),
	leftAt: z.coerce.date().nullable(),
})

const callSchema = z.object({
	id: z.string(),
	conversationId: z.string().nullable(),
	groupId: z.string().nullable(),
	initiatorId: z.string(),
	callType: z.enum(['audio', 'video']),
	startedAt: z.coerce.date(),
	endedAt: z.coerce.date().nullable(),
})

export const previousCallSchema = callSchema.extend({
	group: z
		.object({
			id: z.string(),
			name: z.string(),
		})
		.nullable(),
	currentUser: z.object({
		userId: z.string().nullable(),
		name: z.string(),
		imageUrl: z.string().nullable(),
		role: z.enum(['initiator', 'participant']),
		status: z.enum([
			'outgoing',
			'invited',
			'accepted',
			'declined',
			'missed',
			'joined',
			'left',
		]),
		joinedAt: z.coerce.date().nullable(),
		leftAt: z.coerce.date().nullable(),
	}),
	participants: z.array(callParticipantSchema),
})

export const previousCallsResponseSchema = z.array(previousCallSchema)

export type PreviousCallsResponse = z.infer<typeof previousCallsResponseSchema>
export type PreviousCall = PreviousCallsResponse[number]
export type PreviousCallParticipant = z.infer<typeof callParticipantSchema>
