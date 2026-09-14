import { useState } from 'react'
import { authClient } from '../lib/auth-client'

type ErrorType = {
	code?: string | undefined
	message?: string | undefined
	status: number
	statusText: string
} | null

export const useGoogleAuth = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<ErrorType | null>(null)

	const signInWithGoogle = async () => {
		setIsLoading(true)

		const { error } = await authClient.signIn.social({
			provider: 'google',
			callbackURL: `${window.location.origin}`,
		})

		if (error) {
			setIsLoading(false)
			setError(error)
		}
	}

	return {
		signInWithGoogle,
		error,
		isLoading,
	}
}
