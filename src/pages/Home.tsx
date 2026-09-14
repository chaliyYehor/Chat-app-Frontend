import { useNavigate } from 'react-router-dom'
import { authClient } from '../lib/auth-client'

export default function Home() {
	const navigate = useNavigate()
	async function logout() {
		await authClient.signOut()
		navigate('/login', { replace: true })
	}
	return (
		<button className='bg-red-500 text-white px-4 py-2 rounded-md' onClick={logout}>
			Logout
		</button>
	)
}
