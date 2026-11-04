export default function GroupPfp({
	groupName,
	isLoading = false,
}: {
	groupName: string
	isLoading?: boolean
}) {
	return (
		<div
			className={`groupsPFP w-15 h-15 rounded-2xl flex justify-center items-center font-bold font-inter text-xl text-white shrink-0 ${isLoading ? 'skeleton-shimmer' : ''}`}
			aria-label={isLoading ? 'Loading group avatar' : 'Group avatar'}
		>
			{!isLoading && (groupName ? groupName.slice(0, 2).toUpperCase() : '??')}
		</div>
	)
}
