export default function GroupPfp({groupName}: {groupName: string}) {
	return (
		<div className='groupsPFP w-15 h-15 rounded-2xl flex justify-center items-center font-bold font-inter text-xl text-white shrink-0 '>
			{groupName ? groupName.charAt(0).toUpperCase() + groupName.charAt(1).toUpperCase() : '??'}
		</div>
	)
}
