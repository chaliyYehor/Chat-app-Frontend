import { authClient } from './auth-client'

export const signInWithGoogle = async () => {
	await authClient.signIn.social({
		provider: 'google',
		callbackURL: `${window.location.origin}`,
	})
}

export const signInWithGitHub = async () => {
	await authClient.signIn.social({
		provider: 'github',
		callbackURL: `${window.location.origin}`,
	})
}
