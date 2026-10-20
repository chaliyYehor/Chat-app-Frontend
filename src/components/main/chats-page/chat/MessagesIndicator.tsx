export default function MessagesIndicator({
	numberOfMessages,
}: {
	numberOfMessages: number
}) {
	return (
		<div className='flex justify-center items-center bg-[#7C5CFC] text-white w-6 h-6 rounded-full text-sm font-mono'>
			{numberOfMessages}
		</div>
	)
}
