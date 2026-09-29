export default function SettingsLabel({ label, isPersonalInfo }: { label: string; isPersonalInfo?: boolean }) {
	return (
		<span style={{
			marginLeft: isPersonalInfo ? '0px' : '16px',
		}} className='text-[#6B6B80] text-[12px] font-semibold font-inter uppercase tracking-wider px-2 mb-1'>
			{label}
		</span>
	)
}
