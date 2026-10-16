import { TextField } from '@mui/material'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useSelector } from 'react-redux'
import type { RootType } from '../../../store/store'
import SettingsLabel from './SettingsLabel'
import type { ChangePasswordType } from '../../../schemas/auth/changePassword'

export default function PasswordItem({
	registerName,
	label,
	isLast = false,
	isDisabled = false,
	placeholder,
}: {
	registerName: 'currentPassword' | 'password' | 'confirmPassword'
	label: string
	isLast?: boolean
	isDisabled?: boolean
	placeholder?: string
}) {
	const { register } = useFormContext<ChangePasswordType>()
	const [isPasswordVisible, setIsPasswordVisible] = useState(false)
	const { ref, ...passwordRegistration } = register(registerName)

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
			className='w-full min-w-0 flex flex-col justify-center items-center pb-4'
		>
			<div className='w-fit self-start'>
				<SettingsLabel isPersonalInfo label={label} />
			</div>
			<TextField
				id='standard-basic'
				variant='standard'
				disabled={isDisabled}
				{...passwordRegistration}
				inputRef={ref}
				type={isPasswordVisible ? 'text' : 'password'}
				placeholder={placeholder || '********'}
				slotProps={{
					input: {
						endAdornment: (
							<button
								className='password-visibility-button'
								type='button'
								onClick={() => setIsPasswordVisible((visible) => !visible)}
								disabled={isDisabled}
								aria-label={
									isPasswordVisible ? 'Hide password' : 'Show password'
								}
								style={{
									display: 'flex',
									alignItems: 'center',
									padding: 0,
									marginRight: 8,
									border: 0,
									background: 'transparent',
									color: '#8B8B99',
									cursor: isDisabled ? 'default' : 'pointer',
								}}
							>
								{isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
							</button>
						),
					},
				}}
				sx={{
					width: '95%',
					maxWidth: '100%',
					minWidth: 0,
					'& .password-visibility-button:hover:not(:disabled)': {
						color: '#FFFFFF',
					},
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
