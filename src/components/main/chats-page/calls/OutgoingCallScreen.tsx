import { PhoneOff, User } from 'lucide-react'

export default function OutgoingCallScreen({
	name,
	imageUrl,
	type,
	onCancel,
}: {
	name?: string
	imageUrl?: string | null
	type: 'audio' | 'video'
	onCancel: () => void
}) {
	return (
		<main className='w-screen h-dvh dark:bg-[#09090c] bg-[#f6f6fa] flex items-center justify-center px-6'>
			<section className='flex flex-col items-center text-center' aria-live='polite'>
				<p className='text-xs uppercase tracking-[0.28em] text-[#7C5CFC] font-semibold mb-12'>
					{type === 'video' ? 'Video call' : 'Voice call'}
				</p>
				<div className='outgoing-call-rings relative size-36 mb-8' aria-hidden='true'>
					<div className='absolute inset-0 rounded-full border border-violet-500/40' />
					<div className='absolute inset-3 rounded-full border border-violet-500/30' />
					<div className='absolute inset-6 rounded-full overflow-hidden bg-[#25232e] border border-white/10 flex items-center justify-center'>
						{imageUrl ? (
							<img src={imageUrl} alt='' className='w-full h-full object-cover' />
						) : (
							<User size={48} className='text-white/70' />
						)}
					</div>
				</div>
				<h1 className='dark:text-white text-[#18181b] text-2xl sm:text-3xl font-semibold'>
					{name || 'Your contact'}
				</h1>
				<p className='text-[#888895] mt-2' role='status'>Calling…</p>
				<p className='text-[#6B6B80] text-sm mt-1'>Waiting for them to answer</p>
				<button
					type='button'
					onClick={onCancel}
					className='mt-12 size-16 rounded-full bg-[#FB2C36] hover:bg-[#e9232d] text-white flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400'
					aria-label='Cancel call'
				>
					<PhoneOff size={24} aria-hidden='true' />
				</button>
				<span className='text-[#888895] text-sm mt-3'>Cancel call</span>
			</section>
		</main>
	)
}
