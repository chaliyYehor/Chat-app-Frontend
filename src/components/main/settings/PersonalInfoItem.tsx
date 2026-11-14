import { TextField } from '@mui/material'
import { useId } from 'react'
import { useFormContext } from 'react-hook-form'
import { useSelector } from 'react-redux'
import type {
	ChangeUserInfo,
	ChangeUserInfoInput,
} from '../../../schemas/main/changeUserInfo'
import type { RootType } from '../../../store/store'
import SettingsLabel from './SettingsLabel'

export default function PersonalInfoItem({
	registerName,
	label,
	isLast = false,
	isDisabled = false,
}: {
	registerName: keyof ChangeUserInfoInput
	label: string
	isLast?: boolean
	isDisabled?: boolean
}) {
	const { register } = useFormContext<
		ChangeUserInfoInput,
		unknown,
		ChangeUserInfo
	>()

	const appTheme = useSelector((state: RootType) => state.theme.mode)
	const inputId = useId()
	const isBio = registerName === 'bio'
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
			className='w-full min-w-0 flex flex-col justify-center items-center pb-4'
		>
			<div className='w-fit self-start'>
				<SettingsLabel isPersonalInfo label={label} htmlFor={inputId} />
			</div>
			<TextField
				id={inputId}
				variant='standard'
				multiline={isBio}
				minRows={isBio ? 3 : undefined}
				maxRows={isBio ? 6 : undefined}
				placeholder={isBio ? 'New line: Enter · Link: [label](https://example.com)' : undefined}
				disabled={isDisabled}
				{...register(registerName)}
				sx={{
					width: '95%',
					maxWidth: '100%',
					minWidth: 0,
					'& .MuiInputBase-input': {
						color: appTheme === 'dark' ? '#F0F0F5' : '#000000',
						fontFamily: 'Inter, sans-serif',
						padding: '8px 0 6px',
					},
					'& .MuiInputBase-input.Mui-disabled': {
						WebkitTextFillColor: appTheme === 'dark' ? '#F0F0F5' : '#000000',
					},
					'& .MuiInput-underline:before': {
						borderBottomColor:
							appTheme === 'dark'
								? 'rgba(255, 255, 255, 0.18)'
								: 'rgba(0, 0, 0, 0.1)',
						borderBottomWidth: 1,
					},
					'& .MuiInput-underline:hover:not(.Mui-disabled):before': {
						borderBottomColor:
							appTheme === 'dark'
								? 'rgba(255, 255, 255, 0.35)'
								: 'rgba(0, 0, 0, 0.3)',
					},
					'& .MuiInput-underline:after': {
						borderBottomColor: '#7C5CFC',
					},
				}}
			/>
		</div>
	)
}
