import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useSelector } from 'react-redux'
import type { RootType } from '../store/store'

const contactLink = (
	<a
		className='text-violet-500 underline underline-offset-4'
		href='mailto:contact@erxxue.dev'
	>
		contact@erxxue.dev
	</a>
)

export default function PrivacyPolicy() {
	const isDark = useSelector((state: RootType) => state.theme.mode === 'dark')
	const navigate = useNavigate()
	const heading = isDark ? 'text-white' : 'text-[#18181B]'
	const panel = isDark
		? 'bg-[#16161B] border-white/10'
		: 'bg-white border-black/10'
	const line = isDark ? 'border-white/10' : 'border-black/10'
	const h2 = `border-b pb-2 text-2xl font-semibold leading-snug ${line} ${heading}`
	const cell = `border px-4 py-2.5 ${line}`

	return (
		<main
			className={`w-full h-full min-h-0 font-ibm overflow-y-auto ${isDark ? 'bg-[#09090c]' : 'bg-[#F6F6FA]'}`}
		>
			<div className='max-w-3xl mx-auto px-4 py-5 sm:px-8 sm:py-8'>
				<button
					type='button'
					onClick={() => {
						const historyIndex = window.history.state?.idx
						if (typeof historyIndex === 'number' && historyIndex > 0)
							navigate(-1)
						else navigate('/')
					}}
					aria-label='Go back'
					className={`inline-flex size-10 items-center justify-center rounded-full border transition-colors focus-visible:outline-2 focus-visible:outline-violet-500 ${panel} ${heading} hover:border-violet-500`}
				>
					<ArrowLeft size={18} aria-hidden='true' />
				</button>

				<article
					style={{ color: isDark ? '#E4E4EA' : '#454550' }}
					className={`mt-6 sm:mt-8 rounded-2xl border p-5 sm:p-8 md:p-10 ${panel} text-[15px] sm:text-base leading-7`}
				>
					<header className={`mb-8 border-b pb-4 ${line}`}>
						<h1
							className={`text-3xl sm:text-4xl font-bold leading-tight ${heading}`}
						>
							Privacy Policy
						</h1>
						<p className='mt-4'>
							<strong className={heading}>Pulse</strong>
							<br />
							Last updated: November 10, 2026
						</p>
					</header>

					<div className='space-y-6'>
						<p>
							Pulse (“we”, “us”, “our”) is a personal, non-commercial chat and
							calling project. This Privacy Policy explains what information we
							collect when you use Pulse, how we use it, and what choices you
							have. By using Pulse, you agree to the practices described here.
						</p>
						<p>
							If you have any questions, contact us at{' '}
							<strong className={heading}>{contactLink}</strong>.
						</p>

						<section className='space-y-4 pt-4'>
							<h2 className={h2}>1. Information we collect</h2>
							<p>
								<strong className={heading}>Account information.</strong> When
								you sign up, we collect:
							</p>
							<ul className='list-disc space-y-2 pl-6 marker:opacity-60'>
								<li>
									Your email address and a password (if you register with
									email). Passwords are stored in hashed form, never as plain
									text.
								</li>
								<li>
									If you sign in with Google or GitHub, we receive basic profile
									information from that provider, such as your name, email
									address, and profile picture. We never receive your Google or
									GitHub password.
								</li>
							</ul>
							<p>
								<strong className={heading}>Messages and content.</strong>{' '}
								Messages and any other content you send through Pulse are stored
								on our servers so they can be delivered and shown in your chat
								history.
							</p>
							<p>
								<strong className={heading}>
									Session and technical information.
								</strong>{' '}
								To keep you signed in and protect the service, we process
								technical data such as your IP address, browser and device type,
								and session identifiers.
							</p>
							<p>
								<strong className={heading}>Calls.</strong> Voice and video
								calls are handled in real time through LiveKit. We do not record
								calls, and we do not store call audio or video.
							</p>
						</section>

						<section className='space-y-4 pt-4'>
							<h2 className={h2}>2. How we use your information</h2>
							<p>We use your information only to:</p>
							<ul className='list-disc space-y-2 pl-6 marker:opacity-60'>
								<li>create and manage your account and sign you in;</li>
								<li>deliver messages and connect calls;</li>
								<li>keep the service secure and prevent abuse;</li>
								<li>
									send essential account emails, such as verification messages;
								</li>
								<li>fix bugs and maintain the service.</li>
							</ul>
							<p>
								We do not sell your personal data, and we do not use it for
								advertising.
							</p>
						</section>

						<section className='space-y-4 pt-4'>
							<h2 className={h2}>3. Message security</h2>
							<p>
								Data sent between your device and Pulse is transmitted over
								encrypted connections (HTTPS/TLS). Messages are stored on our
								servers and are{' '}
								<strong className={heading}>not end-to-end encrypted</strong>.
								This means that, technically, the operator of Pulse has the
								ability to access stored messages. We do not read your messages,
								except where necessary to maintain or secure the service, or
								where required by law. Because Pulse is a hobby project, please
								avoid sharing highly sensitive information such as passwords,
								financial details, or government ID numbers in chats.
							</p>
						</section>

						<section className='space-y-4 pt-4'>
							<h2 className={h2}>4. Cookies</h2>
							<p>
								Pulse uses only strictly necessary cookies, for example to keep
								you signed in. We do not use advertising cookies or third-party
								analytics or tracking cookies.
							</p>
						</section>

						<section className='space-y-4 pt-4'>
							<h2 className={h2}>5. Service providers</h2>
							<p>
								We rely on trusted third-party providers to run Pulse. They
								process data on our behalf, only as needed to provide their
								services:
							</p>
							<div className='overflow-x-auto'>
								<table className='w-full min-w-md border-collapse text-left text-sm sm:text-[15px]'>
									<thead className={isDark ? 'bg-white/5' : 'bg-black/5'}>
										<tr>
											<th
												scope='col'
												className={`${cell} font-semibold ${heading}`}
											>
												Provider
											</th>
											<th
												scope='col'
												className={`${cell} font-semibold ${heading}`}
											>
												Purpose
											</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td className={cell}>Vercel</td>
											<td className={cell}>Frontend hosting</td>
										</tr>
										<tr>
											<td className={cell}>Render</td>
											<td className={cell}>Backend hosting</td>
										</tr>
										<tr>
											<td className={cell}>Neon</td>
											<td className={cell}>PostgreSQL database hosting</td>
										</tr>
										<tr>
											<td className={cell}>LiveKit</td>
											<td className={cell}>Real-time voice and video calls</td>
										</tr>
										<tr>
											<td className={cell}>Resend</td>
											<td className={cell}>Sending account emails</td>
										</tr>
										<tr>
											<td className={cell}>Google and GitHub</td>
											<td className={cell}>Optional sign-in (OAuth)</td>
										</tr>
									</tbody>
								</table>
							</div>
							<p>
								Some of these providers may process data outside your country,
								including outside the European Economic Area, such as in the
								United States. Each provider has its own privacy policy that
								governs how it handles data.
							</p>
						</section>

						<section className='space-y-4 pt-4'>
							<h2 className={h2}>6. Data retention and deletion</h2>
							<p>
								We keep your data for as long as your account exists. You can
								delete your account at any time. When you do, your account and
								the data associated with it, including your messages, are
								permanently deleted. Copies may remain in automated backups of
								our hosting providers for a limited period before they are
								overwritten. You can also request deletion by emailing{' '}
								{contactLink}.
							</p>
						</section>

						<section className='space-y-4 pt-4'>
							<h2 className={h2}>7. Your rights</h2>
							<p>
								Depending on where you live (including in the EU/EEA under the
								GDPR), you may have the right to:
							</p>
							<ul className='list-disc space-y-2 pl-6 marker:opacity-60'>
								<li>access the personal data we hold about you;</li>
								<li>correct inaccurate data;</li>
								<li>delete your data;</li>
								<li>restrict or object to certain processing;</li>
								<li>receive a copy of your data in a portable format;</li>
								<li>
									withdraw your consent at any time, where processing is based
									on consent.
								</li>
							</ul>
							<p>
								To exercise any of these rights, email{' '}
								<strong className={heading}>{contactLink}</strong>. You also
								have the right to lodge a complaint with your local data
								protection authority. In Slovakia, this is the Office for
								Personal Data Protection of the Slovak Republic (Úrad na ochranu
								osobných údajov SR).
							</p>
						</section>

						<section className='space-y-4 pt-4'>
							<h2 className={h2}>8. Children</h2>
							<p>
								Pulse is not intended for children under 16. We do not knowingly
								collect personal data from children under 16. If you believe a
								child has provided us with personal data, please contact us and
								we will delete it.
							</p>
						</section>

						<section className='space-y-4 pt-4'>
							<h2 className={h2}>9. Changes to this policy</h2>
							<p>
								We may update this Privacy Policy from time to time. When we do,
								we will change the “Last updated” date above. Continued use of
								Pulse after changes means you accept the updated policy.
							</p>
						</section>

						<section className='space-y-4 pt-4'>
							<h2 className={h2}>10. Contact</h2>
							<p>
								Questions or requests about this policy or your data:{' '}
								<strong className={heading}>{contactLink}</strong>
							</p>
						</section>
					</div>
				</article>
			</div>
		</main>
	)
}
