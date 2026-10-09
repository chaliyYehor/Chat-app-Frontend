import PersonalInfoItem from './PersonalInfoItem'

export default function ContactInfo() {
	return (
		<div className='outline mx-4 mb-4 dark:outline-white/7 outline-black/10  rounded-2xl flex flex-col'>
			<div
				style={{
					borderBottom: '1px solid rgba(255, 255, 255, 0.07)',
				}}
				className='flex flex-col border-b items-center rounded-2xl border-white/7 w-full h-full px-2 py-4 overflow-hidden'
			>
				<PersonalInfoItem label='email' registerName='email' isLast isDisabled />
			</div>
		</div>
	)
}
