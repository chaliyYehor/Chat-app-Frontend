import { Outlet } from 'react-router-dom'
import CallsList from '../components/main/chats-page/calls/CallsList'

export default function Calls() {
	return (
		<div className='flex w-full h-full min-w-0'>
			<div className='messagesSection outline-1 outline-gray-700/60 w-100 shrink-0 flex'>
				<CallsList />
			</div>
			<div className='flex-1 min-w-0'>
				<Outlet />
			</div>
		</div>
	)
}
