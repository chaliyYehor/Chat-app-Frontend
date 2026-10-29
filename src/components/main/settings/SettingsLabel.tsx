export default function SettingsLabel({
	label,
	isPersonalInfo,
	htmlFor,
}: {
	label: string
	isPersonalInfo?: boolean
	htmlFor?: string
}) {
	const className =
		'text-[#6B6B80] text-[12px] font-semibold font-inter uppercase tracking-wider px-2 mb-1'
	const style = { marginLeft: isPersonalInfo ? '0px' : '16px' }

	return htmlFor ? (
		<label htmlFor={htmlFor} style={style} className={className}>
			{label}
		</label>
	) : (
		<span style={style} className={className}>
			{label}
		</span>
	)
}
