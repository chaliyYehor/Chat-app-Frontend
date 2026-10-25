import { User } from 'lucide-react'

interface AvatarProps {
	lightColor?: string
	state: 'online' | 'away' | 'offline'
	imageUrl?: string
	isLoading?: boolean
}

export default function Avatar({ lightColor, state, imageUrl, isLoading }: AvatarProps) {
	const colors = {
		online: { text: '#00D4AA', bg: '#00D4AA' },
		away: { text: '#F59E0B', bg: '#F59E0B' },
		offline: { text: '#6B6B80', bg: '#6B6B80' },
	}
	return (
		<div
			className={`w-15 h-15 rounded-[50%] dark:text-white flex justify-center items-center border-2 border-gray-700 relative shrink-0 ${'text-' + lightColor}`.trim()}
		>
			{isLoading ? <div className='loader' /> : imageUrl ? (
				<img
					src={imageUrl}
					alt='Profile'
					className='w-full h-full object-cover rounded-[50%]'
				/>
			) : (
				<User />
			)}
			<div
				style={{ backgroundColor: colors[state].bg }}
				className='w-3 capitalize h-3 border dark:border-white border-black rounded-[50%] absolute right-0 top-[68%]'
				aria-label='Online'
			/>
		</div>
	)
}
