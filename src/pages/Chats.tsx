import { Outlet } from 'react-router-dom'
import ChatList from '../components/main/chats-page/ChatList'

export default function Chats() {
	return (
		<div className='flex w-full h-full'>
			<div className='messagesSection outline-1 outline-gray-700/60 w-100 shrink-0 flex'>
				<ChatList />
			</div>
			<div className='flex-1 w-full'>
				<Outlet />
			</div>
		</div>
	)
}
