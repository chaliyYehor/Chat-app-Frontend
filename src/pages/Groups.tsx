import { Outlet } from 'react-router-dom'
import GroupList from '../components/main/chats-page/groups/GroupList'

export default function Groups() {
	return (
		<div className='flex w-full h-full min-w-0'>
			<div className='messagesSection outline-1 outline-gray-700/60 w-100 shrink-0 flex'>
				<GroupList />
			</div>
			<div className='flex-1 min-w-0'>
				<Outlet />
			</div>
		</div>
	)
}
