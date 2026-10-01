interface AvatarProps {
	lightColor?: string
}

export default function Avatar({ lightColor }: AvatarProps) {
	return (
		<div
			className={`w-15 h-15 rounded-[50%] dark:text-white flex justify-center items-center border-2 border-gray-700 relative shrink-0 ${'text-' + lightColor}`.trim()}
		>
			PFP
			<div
				className='w-3 h-3 bg-green-500 border dark:border-white border-black rounded-[50%] absolute right-0 top-[68%]'
				aria-label='Online'
			/>
		</div>
	)
}
