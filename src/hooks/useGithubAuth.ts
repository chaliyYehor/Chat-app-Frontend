import { useState } from 'react'
import { authClient } from '../lib/auth-client'

type ErrorType = {
	code?: string | undefined
	message?: string | undefined
	status: number
	statusText: string
} | null

export const useGithubAuth = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<ErrorType | null>(null)

	const signInWithGithub = async () => {
		setIsLoading(true)

		const { error } = await authClient.signIn.social({
			provider: 'github',
			callbackURL: `${window.location.origin}`,
		})

		if (error) {
			setIsLoading(false)
			setError(error)
		}
	}

	return {
		signInWithGithub,
		error,
		isLoading,
	}
}
