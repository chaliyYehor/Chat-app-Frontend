import { useEffect, useState } from 'react'
import type { ChatMenuPosition } from '../chat/ChatPreview'
import NoConvosYet from '../NoConvosYet'
import CreateGroup from './CreateGroup'
import GroupPreview from './GroupPreview'
import NewGroupChatBtn from './NewGroupChatBtn'
import { useGetGroups } from '../../../../hooks/useGetGroups'
import { setPopUpError } from '../../../../store/slices/popUpSlice'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../../../../store/store'
import type {
	GroupResponse,
	GroupsResponse,
} from '../../../../schemas/main/getGroupsResponse'

export default function GroupList() {
	const [isAdding, setIsAdding] = useState(false)
	const [activeGroupMenu, setActiveGroupMenu] = useState<{
		id: string
		position: ChatMenuPosition
	} | null>(null)

	const {
		data: groups,
		isError: isGroupsError,
		isPending: isGroupsLoading,
	} = useGetGroups()

	const dispatch = useDispatch<AppDispatch>()

	useEffect(() => {
		if (isGroupsError) {
			dispatch(
				setPopUpError({
					heading: 'Error',
					text: 'Failed to load groups. Please try again.',
				}),
			)
		}
	}, [isGroupsError, dispatch])

	function renderGroupPreview(id: string, groupInfo: GroupResponse) {
		return (
			<GroupPreview
				key={id}
				groupInfo={groupInfo}
				menuPosition={
					activeGroupMenu?.id === id ? activeGroupMenu.position : null
				}
				onOpenMenu={position => setActiveGroupMenu({ id, position })}
				onCloseMenu={() => setActiveGroupMenu(null)}
			/>
		)
	}

	return (
		<div className='chatListContainer h-full w-full min-w-0 dark:bg-[#16161b] bg-white pb-15'>
			<div className='mb-10 flex flex-col gap-4 mt-5'>
				<div className='flex items-center justify-between px-4 py-2'>
					<h2 className='dark:text-white text-3xl font-bold '>Groups</h2>
					{groups && groups?.groups.length > 0 && <NewGroupChatBtn isGroup onClick={setIsAdding} />}
				</div>
			</div>

			{!groups && isGroupsLoading ? (
				<div className='w-full h-full flex justify-center items-center'>
					<div className='loader bg-black dark:bg-white' />
				</div>
			) : !groups || groups.groups.length === 0 ? (
				<NoConvosYet isGroup onClick={setIsAdding} />
			) : (
				<>
					<section className='px-4 font-semibold text-sm mb-5'>
						<p className='text-[#6B6B80] font-inter mb-3'>YOUR GROUPS</p>
						<div className='flex flex-col gap-4'>
							{groups.groups.map(group => {

								return renderGroupPreview(group.group.id, group)
							})}
						</div>
					</section>
				</>
			)}
			{isAdding && <CreateGroup setIsAdding={setIsAdding} />}
		</div>
	)
}
