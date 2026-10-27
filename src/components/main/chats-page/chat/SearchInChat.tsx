import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ChevronDown, ChevronUp, Search, X } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function SearchInChat({ onClose }: { onClose: () => void }) {
	const [search, setSearch] = useState('')
	const [resultsElements, setResultsElements] = useState<Element[]>([])
	const [currentResultIndex, setCurrentResultIndex] = useState<number>(0)
	useGSAP(() => {
		gsap.from('.search-in-chat', {
			duration: 0.3,
			opacity: 0,
			ease: 'power2.out',
		})
	})

	const handleClose = () => {
		gsap.to('.search-in-chat', {
			duration: 0.3,
			opacity: 0,
			ease: 'power2.in',
			onComplete: onClose,
		})
	}

	useEffect(() => {
		const updateResults = () => {
			const query = search.trim()
			if (!query) {
				setResultsElements([])
				setCurrentResultIndex(0)
				return
			}

			const escapedSearch = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
			const regex = new RegExp(escapedSearch, 'i')
			const matches = Array.from(
				document.querySelectorAll('.message-text'),
			).filter(message => regex.test(message.textContent ?? ''))

			setResultsElements(matches)
			setCurrentResultIndex(0)
			matches[0]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
		}

		updateResults()

		const messagesContainer = document.querySelector('.messages')
		if (!messagesContainer) return

		const observer = new MutationObserver(updateResults)
		observer.observe(messagesContainer, {
			childList: true,
			characterData: true,
			subtree: true,
		})

		return () => observer.disconnect()
	}, [search])

	const results = resultsElements.length
	const goToResult = (direction: -1 | 1) => {
		if (results === 0) return

		const nextIndex = (currentResultIndex + direction + results) % results
		setCurrentResultIndex(nextIndex)
		resultsElements[nextIndex]?.scrollIntoView({
			behavior: 'smooth',
			block: 'center',
		})
	}
	return (
		<div className='w-full absolute h-9 -bottom-9 z-10 search-in-chat'>
			<div className='bg-[#F0F0F4] dark:bg-[#1A1A22] text-[#6B6B80] flex items-center gap-2 px-4 py-3 border-b border-gray-700/40'>
				<div>
					<Search size={16} />
				</div>
				<input
					value={search}
					onChange={e => setSearch(e.target.value)}
					type='text'
					placeholder='Search in chat...'
					className='bg-transparent outline-none w-full'
				/>
				<button
					type='button'
					onClick={handleClose}
					className='cursor-pointer hover:dark:text-white hover:text-black transition-colors'
				>
					<X size={16} />
				</button>
			</div>
			<div className='bg-[#F0F0F4] dark:bg-[#1A1A22] text-[#6B6B80] flex items-center justify-center gap-2 px-4 py-1 border-b border-gray-700/40'>
				<button
					type='button'
					onClick={() => goToResult(-1)}
					disabled={results === 0}
					className='cursor-pointer p-2 hover:dark:text-white hover:text-black transition-colors'
				>
					<ChevronUp size={16} />
				</button>
				{results === 0 ? (
					<p className='font-mono font-light'>0 results</p>
				) : results === 1 ? (
					<p className='font-mono font-light'>1 result</p>
				) : (
					<p className='font-mono font-light'>{results} results</p>
				)}
				<button
					type='button'
					disabled={results === 0}
					onClick={() => goToResult(1)}
					className='cursor-pointer p-2 hover:dark:text-white hover:text-black transition-colors'
				>
					<ChevronDown size={16} />
				</button>
			</div>
		</div>
	)
}
