type PresenceStatus = 'online' | 'offline'
type ProfileStatus = 'online' | 'away' | 'offline'

export function getDisplayedStatus(
	status: PresenceStatus | undefined,
	previouslySetStatus: ProfileStatus | undefined,
): ProfileStatus {
	if (status === 'offline') return 'offline'

	return previouslySetStatus || 'offline'
}
