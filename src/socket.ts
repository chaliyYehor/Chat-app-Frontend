import {io} from 'socket.io-client'

export const socket = io(import.meta.env.VITE_SERVER_URL || 'http://localhost:5000', {
	path: '/ws',
	autoConnect: false,
	withCredentials: true,
	reconnection: true,
	reconnectionAttempts: 5,
	reconnectionDelay: 1000,
})
