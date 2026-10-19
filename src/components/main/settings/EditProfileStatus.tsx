import { Check } from 'lucide-react'
import type {
	ChangeUserInfo,
	ChangeUserInfoInput,
} from '../../../schemas/main/changeUserInfo'
import { useController, useFormContext } from 'react-hook-form'
import type { RootType } from '../../../store/store'
import { useSelector } from 'react-redux'

const statuses = [
	{ value: 'online', label: 'Online', color: 'bg-green-500' },
	{ value: 'away', label: 'Away', color: 'bg-yellow-500' },
	{ value: 'offline', label: 'Appear Offline', color: 'bg-gray-500' },
]

type ProfileStatus = NonNullable<ChangeUserInfo['previouslySetStatus']>

export default function EditProfileStatus() {
	const appTheme = useSelector((state: RootType) => state.theme.mode)

	const { control } = useFormContext<ChangeUserInfoInput>()

	const { field } = useController({
		name: 'previouslySetStatus',
		control,
	})

	const selectedStatus = field.value as ProfileStatus | undefined
	return (
		<div className='outline mx-4 mb-4 dark:outline-white/7 outline-black/10 rounded-2xl flex flex-col overflow-hidden'>
			{statuses.map((status, index) => {
				const isSelected = selectedStatus === status.value

				return (
					<button
						type='button'
						key={status.value}
						aria-pressed={isSelected}
						onClick={() => field.onChange(status.value)}
						className={`flex items-center w-full p-4 text-left transition-colors cursor-pointer ${
							index !== statuses.length - 1 && appTheme === 'dark'
								? 'border-b border-white/7'
								: index !== statuses.length - 1
									? 'border-b border-black/10'
									: ''
						} ${isSelected ? 'bg-[#7C5CFC]/10' : 'hover:bg-[#7C5CFC]/10'}`}
					>
						<div className='flex-1 flex items-center gap-3'>
							<span
								className={`h-2.5 w-2.5 rounded-full ${status.color}`}
								aria-hidden='true'
							/>
							<span className='font-medium font-inter dark:text-white'>
								{status.label}
							</span>
						</div>
						{isSelected && (
							<Check size={20} strokeWidth={2.5} className='text-[#7C5CFC]' />
						)}
					</button>
				)
			})}
		</div>
	)
}
