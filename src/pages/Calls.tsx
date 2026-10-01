import { Outlet } from 'react-router-dom'
import CallsList from '../components/main/chats-page/calls/CallsList'

export default function Calls() {
	return (
		<div className='flex w-full h-full min-w-0 relative'>
			<div className='messagesSection outline-1 outline-gray-700/60 md:w-100 w-full shrink-0 flex'>
				<CallsList />
			</div>
			<div className='flex-1 min-w-0 absolute top-0 left-0 md:relative md:top-auto md:left-auto h-full'>
				<Outlet />
			</div>
		</div>
	)
}
