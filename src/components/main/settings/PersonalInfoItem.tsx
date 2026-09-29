import { TextField } from '@mui/material'
import SettingsLabel from './SettingsLabel'
import type {
	ChangeUserInfo,
	ChangeUserInfoInput,
} from '../../../schemas/main/changeUserInfo'
import { useFormContext } from 'react-hook-form'

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
	return (
		<div style={{ borderBottom: isLast ? 'none' : '1px solid rgba(255, 255, 255, 0.07)' }} className='w-full flex flex-col justify-center items-center pb-4'>
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
						color: '#F0F0F5',
						fontFamily: 'Inter, sans-serif',
						padding: '8px 0 6px',
					},
					'& .MuiInput-underline:before': {
						borderBottomColor: 'rgba(255, 255, 255, 0.18)',
						borderBottomWidth: 1,
					},
					'& .MuiInput-underline:hover:not(.Mui-disabled):before': {
						borderBottomColor: 'rgba(255, 255, 255, 0.35)',
					},
					'& .MuiInput-underline:after': {
						borderBottomColor: '#7C5CFC',
					},
				}}
			/>
		</div>
	)
}
