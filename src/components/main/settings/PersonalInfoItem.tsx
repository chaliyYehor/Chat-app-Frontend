import { TextField } from '@mui/material'
import SettingsLabel from './SettingsLabel'
import type {
	ChangeUserInfo,
	ChangeUserInfoInput,
} from '../../../schemas/main/changeUserInfo'
import { useFormContext } from 'react-hook-form'
import type { RootType } from '../../../store/store'
import { useSelector } from 'react-redux'

export default function PersonalInfoItem({
	registerName,
	label,
	isLast = false,
}: {
	registerName: keyof ChangeUserInfoInput
	label: string
	isLast?: boolean
}) {
	const { register } = useFormContext<
		ChangeUserInfoInput,
		unknown,
		ChangeUserInfo
	>()

	const appTheme = useSelector((state: RootType) => state.theme.mode)
	return (
		<div
			style={{
				borderBottom:
					!isLast && appTheme === 'dark'
						? '1px solid rgba(255, 255, 255, 0.07)'
						: !isLast && appTheme === 'light'
							? '1px solid rgba(0, 0, 0, 0.1)'
							: 'none',
			}}
			className='w-full flex flex-col justify-center items-center pb-4'
		>
			<div className='w-fit self-start'>
				<SettingsLabel isPersonalInfo label={label} />
			</div>
			<TextField
				id='standard-basic'
				variant='standard'
				{...register(registerName)}
				sx={{
					width: '95%',
					'& .MuiInputBase-input': {
						color: appTheme === 'dark' ? '#F0F0F5' : '#000000',
						fontFamily: 'Inter, sans-serif',
						padding: '8px 0 6px',
					},
					'& .MuiInput-underline:before': {
						borderBottomColor: appTheme === 'dark' ? 'rgba(255, 255, 255, 0.18)' : 'rgba(0, 0, 0, 0.1)',
						borderBottomWidth: 1,
					},
					'& .MuiInput-underline:hover:not(.Mui-disabled):before': {
						borderBottomColor: appTheme === 'dark' ? 'rgba(255, 255, 255, 0.35)' : 'rgba(0, 0, 0, 0.3)',
					},
					'& .MuiInput-underline:after': {
						borderBottomColor: '#7C5CFC',
					},
				}}
			/>
		</div>
	)
}
