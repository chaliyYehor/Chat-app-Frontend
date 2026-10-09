import { useSelector } from 'react-redux'
import type { RootType } from '../../../store/store'
import PersonalInfoItem from './PersonalInfoItem'

export default function PersonalInfo() {
	const appTheme = useSelector((state: RootType) => state.theme.mode)
	return (
		<>
			<div className='outline mx-4 mb-4 dark:outline-white/7 outline-black/10  rounded-2xl flex flex-col'>
				<div
					style={{
						borderBottom:
							appTheme === 'dark'
								? '1px solid rgba(0, 0, 0, 0.1)'
								: '1px solid rgba(255, 255, 255, 0.07)',
					}}
					className='flex flex-col border-b items-center rounded-2xl border-white/7 w-full h-full px-2 py-4 overflow-hidden'
				>
					<PersonalInfoItem label='display name' registerName='name' />
					<PersonalInfoItem label='User ID' registerName='userId' isDisabled />
					<PersonalInfoItem label='bio' registerName='bio' isLast />
				</div>
			</div>
		</>
	)
}
