import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ChevronDown } from 'lucide-react'

export default function ScrollDownBtn({
	onClick,
	isVisible,
}: {
	onClick: () => void
	isVisible: boolean
}) {
	useGSAP(() => {
		if (isVisible) {
			gsap.fromTo(
				'#go-down',
				{
					y: 20,
					opacity: 0,
					duration: 0.3,
					ease: 'power2.out',
				},
				{
					y: 0,
					opacity: 1,
					duration: 0.3,
					ease: 'power2.out',
				},
			)
		} else {
			gsap.fromTo(
				'#go-down',
				{
					y: 0,
					opacity: 1,
					duration: 0.3,
					ease: 'power2.out',
				},
				{
					y: 20,
					opacity: 0,
					duration: 0.3,
					ease: 'power2.out',
				},
			)
		}
	}, [isVisible])

	return (
		<button
			id='go-down'
			type='button'
			aria-label='Scroll to the latest message'
			onClick={onClick}
			className='fixed z-10 cursor-pointer bottom-26 right-4 w-12 h-12 rounded-full flex items-center justify-center border border-gray-300/50 dark:border-gray-300/15 bg-white dark:bg-[#16161B] shadow-xl transition-colors hover:dark:bg-[#252530] hover:bg-[#e8e8e8] dark:text-white text-gray-800 hover:text-purple-500'
		>
			<ChevronDown />
		</button>
	)
}
