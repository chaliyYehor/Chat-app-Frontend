import { Stack, styled, Switch } from '@mui/material'
import { useSelector } from 'react-redux'
import type { RootType } from '../../../store/store'
import type { UseMutateAsyncFunction } from '@tanstack/react-query'

const AntSwitch = styled(Switch, {
	shouldForwardProp: prop => prop !== 'appTheme',
})<{ appTheme: 'light' | 'dark' }>(({ theme, appTheme }) => ({
	width: 45,
	height: 25,
	padding: 0,
	display: 'flex',
	'&:active': {
		'& .MuiSwitch-thumb': {
			width: 21,
		},
		'& .MuiSwitch-switchBase.Mui-checked': {
			transform: 'translateX(20px)',
		},
	},
	'& .MuiSwitch-switchBase': {
		padding: 2,
		'&.Mui-checked': {
			transform: 'translateX(20px)',
			color: '#fff',
			'& + .MuiSwitch-track': {
				opacity: 1,
				backgroundColor: '#7C5CFC',
			},
		},
	},
	'& .MuiSwitch-thumb': {
		boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
		width: 21,
		height: 21,
		borderRadius: '50%',
		transition: theme.transitions.create(['width'], {
			duration: 200,
		}),
	},
	'& .MuiSwitch-track': {
		borderRadius: 25 / 2,
		opacity: 1,
		boxSizing: 'border-box',
		backgroundColor: appTheme === 'dark' ? '#1E1E26' : '#EBEBF0',
	},
}))

type SettingsSwitchProps = {
	label: "typingSounds" | "messageSounds" | "lastSeen" | "readReceipts"
	ifChecked: boolean
	onChange: UseMutateAsyncFunction<any, Error, {
    type: "typingSounds" | "messageSounds" | "lastSeen" | "readReceipts";
    value: boolean;
}, unknown>,
	isPending?: boolean
}

export default function SettingsSwitch({
	label,
	onChange,
	ifChecked,
	isPending,
}: SettingsSwitchProps) {
	const appTheme = useSelector((state: RootType) => state.theme.mode)

	const labels = {
		typingSounds: 'Typing Sound',
		messageSounds: 'Message Sound',
		lastSeen: 'Last Seen',
		readReceipts: 'Read Receipts',
	}

	return (
		<Stack>
			<AntSwitch
				disabled={isPending}	
				checked={ifChecked}
				onChange={async (_, newChecked) => await onChange({ type: label, value: newChecked })}
				appTheme={appTheme}
				aria-label={labels[label]}
			/>
		</Stack>
	)
}
