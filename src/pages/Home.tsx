import { useNavigate } from 'react-router-dom'
import { authClient } from '../lib/auth-client'
import { useEffect } from 'react'

export default function Home() {
	const navigate = useNavigate()

	const { data: session, isPending } = authClient.useSession()

	useEffect(() => {
		if (!isPending && !session) {
			navigate('/signUp')
		}
	}, [isPending, session, navigate])

	if (isPending) {
		return (
			<div className='w-screen h-screen absolute top-0 left-0 flex justify-center items-center'>
				<div className='loader dark:bg-white bg-black' />
			</div>
		)
	}

	async function logout() {
		await authClient.signOut()
		navigate('/login', { replace: true })
	}
	return (
		<button
			className='bg-red-500 text-white px-4 py-2 rounded-md'
			onClick={logout}
		>
			Logout
		</button>
	)
}
