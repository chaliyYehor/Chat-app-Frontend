import { Laptop, LogOut, Monitor, Smartphone, Tablet } from 'lucide-react'
import { useSelector } from 'react-redux'
import type { RootType } from '../../../store/store'
import { authClient } from '../../../lib/auth-client'
import { useEffect, useState } from 'react'

type Session = {
	id: string
	token: string
	userAgent?: string | null
	ipAddress?: string | null
	createdAt: Date | string
	updatedAt?: Date | string | null
}

function getDeviceInfo(userAgent: string | null | undefined) {
	const value = userAgent ?? ''
	const isMobile = /mobile|iphone|android/i.test(value)
	const isTablet = /ipad|tablet/i.test(value)
	const browser = /edg/i.test(value)
		? 'Edge'
		: /chrome|crios/i.test(value)
			? 'Chrome'
			: /firefox|fxios/i.test(value)
				? 'Firefox'
				: /safari/i.test(value) && !/chrome|crios/i.test(value)
					? 'Safari'
					: /opera|opr/i.test(value)
						? 'Opera'
						: 'Unknown browser'
	const operatingSystem = /windows/i.test(value)
		? 'Windows'
		: /mac os|macintosh/i.test(value)
			? 'macOS'
			: /android/i.test(value)
				? 'Android'
				: /iphone|ipad|ios/i.test(value)
					? 'iOS'
					: /linux/i.test(value)
						? 'Linux'
						: 'Unknown device'

	return {
		label: `${browser} · ${operatingSystem}`,
		icon: isTablet
			? Tablet
			: isMobile
				? Smartphone
				: /macintosh|windows|linux/i.test(value)
					? Laptop
					: Monitor,
	}
}

function formatRelativeDate(date: Date | string | null | undefined) {
	if (!date) return 'Activity unavailable'

	const timestamp = new Date(date).getTime()
	if (Number.isNaN(timestamp)) return 'Activity unavailable'

	const elapsedSeconds = Math.max(0, Math.floor((Date.now() - timestamp) / 1000))
	if (elapsedSeconds < 60) return 'Active now'
	if (elapsedSeconds < 3600) return `${Math.floor(elapsedSeconds / 60)}m ago`
	if (elapsedSeconds < 86400) return `${Math.floor(elapsedSeconds / 3600)}h ago`
	if (elapsedSeconds < 604800) return `${Math.floor(elapsedSeconds / 86400)}d ago`

	return new Intl.DateTimeFormat(undefined, {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
	}).format(timestamp)
}

export default function SettingsActSess() {
	const [sessions, setSessions] = useState<Session[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [revokingSessionId, setRevokingSessionId] = useState<string | null>(null)
	const { data: currentSession } = authClient.useSession()
	const appTheme = useSelector((state: RootType) => state.theme.mode)

	useEffect(() => {
		async function getSessions() {
			try {
				const { data, error } = await authClient.listSessions()

				if (error) {
					console.error(error)
					setErrorMessage('Unable to load active sessions')
					return
				}

				setSessions((data ?? []) as Session[])
			} catch (error) {
				console.error(error)
				setErrorMessage('Unable to load active sessions')
			} finally {
				setIsLoading(false)
			}
		}

		void getSessions()
	}, [])

	async function revokeSession(session: Session) {
		setRevokingSessionId(session.id)
		try {
			const { error } = await authClient.revokeSession({ token: session.token })
			if (error) {
				console.error(error)
				return
			}

			setSessions(currentSessions =>
				currentSessions.filter(currentSessionItem => currentSessionItem.id !== session.id),
			)
		} catch (error) {
			console.error(error)
		} finally {
			setRevokingSessionId(null)
		}
	}

	return (
		<div className='outline mx-4 mb-4 dark:outline-white/7 outline-black/10 rounded-2xl flex flex-col'>
			{isLoading &&
				Array(3)
					.fill('')
					.map((_, index) => (
						<div key={index} className='h-14 w-[90%] ml-5 my-2 rounded-2xl skeleton-shimmer' />
					))}
			{!isLoading && errorMessage && (
				<p className='p-4 text-sm text-[#6B6B80] font-inter'>{errorMessage}</p>
			)}
			{!isLoading && !errorMessage && sessions.length === 0 && (
				<p className='p-4 text-sm text-[#6B6B80] font-inter'>No active sessions</p>
			)}
			{!isLoading &&
				!errorMessage &&
				sessions.map((session, index) => {
					const device = getDeviceInfo(session.userAgent)
					const Icon = device.icon
					const isCurrentSession = session.token === currentSession?.session?.token

					return (
						<div
							key={session.id}
							style={{
								borderBottom:
									index !== sessions.length - 1 && appTheme === 'dark'
										? '1px solid rgba(255, 255, 255, 0.07)'
										: index !== sessions.length - 1
											? '1px solid rgba(0, 0, 0, 0.07)'
											: 'none',
							}}
							className='flex items-center border-white/7 w-full p-4 gap-3'
						>
							<Icon size={18} color='#6B6B80' />
							<div className='flex-1 min-w-0 flex flex-col'>
								<div className='flex items-center gap-2'>
									<span className='dark:text-white font-medium font-inter truncate'>
										{device.label}
									</span>
									{isCurrentSession && (
										<span className='text-emerald-500 text-xs font-inter whitespace-nowrap'>
											This device
										</span>
									)}
								</div>
								<span className='text-[#6B6B80] text-sm font-inter'>
									{session.ipAddress ? `IP: ${session.ipAddress}` : 'IP unavailable'} ·{' '}
									{formatRelativeDate(session.updatedAt ?? session.createdAt)}
								</span>
							</div>
							<button
								type='button'
								disabled={revokingSessionId === session.id}
								onClick={() => void revokeSession(session)}
								aria-label={`Revoke ${device.label} session`}
								className='text-[#FF6467] hover:text-red-300 transition-colors shrink-0 font-inter font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
							>
								<LogOut size={18} />
							</button>
						</div>
					)
				})}
		</div>
	)
}
