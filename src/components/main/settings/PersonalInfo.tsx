import PersonalInfoItem from './PersonalInfoItem'

export default function PersonalInfo() {
	return (
		<>
			<div className='outline mx-4 mb-4 outline-white/7  rounded-2xl flex flex-col'>
				<div
					style={{
						borderBottom: '1px solid rgba(255, 255, 255, 0.07)',
					}}
					className='flex flex-col border-b items-center rounded-2xl border-white/7 w-full h-full px-2 py-4 overflow-hidden'
				>
					<PersonalInfoItem label='display name' registerName='displayName' />
					<PersonalInfoItem label='username' registerName='username' />
					<PersonalInfoItem label='bio' registerName='bio' isLast/>
				</div>
			</div>
		</>
	)
}
