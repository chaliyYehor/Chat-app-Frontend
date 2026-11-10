import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Chat } from './components/main/chats-page/chat/Chat'
import Group from './components/main/chats-page/groups/Group'
import SelectConvoUi from './components/main/SelectConvoUi'
import Calls from './pages/Calls'
import Chats from './pages/Chats'
import ForgotPassword from './pages/ForgotPassword'
import Groups from './pages/Groups'
import Home from './pages/Home'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import ResetPassword from './pages/ResetPassword'
import SetEditProfilePage from './pages/SetEditProfilePage'
import SetSecurityPage from './pages/SetSecurityPage'
import Settings from './pages/Settings'
import SignUp from './pages/SignUp'
import Verify from './pages/Verify'
import { loginSchema, type LoginType } from './schemas/auth/login'
import { signUpSchema, type SignUpType } from './schemas/auth/signUp'
import { chatSearchSchema, type ChatSearch } from './schemas/main/chatSearch'
import {
	groupCreationSchema,
	type GroupCreation,
} from './schemas/main/groupCreation'
import { useSelector } from 'react-redux'
import type { RootType } from './store/store'
import { useEffect } from 'react'
import { useIsMobile } from './hooks/useIsMobile'
import { SetNewPassword } from './pages/SetNewPassword'
import SetChangePassword from './pages/SetChangePassword'
import PrivacyPolicy from './pages/PrivacyPolicy'
import {
	changePasswordSchema,
	type ChangePasswordType,
} from './schemas/auth/changePassword'
import Call from './pages/Call'
import VideoCall from './pages/VideoCall'
import GroupCall from './pages/GroupCall'
import GroupVideoCall from './pages/GroupVideoCall'
import { authClient } from './lib/auth-client'
import { useAppSocket } from './hooks/useAppSocket'

function getPageMetadata(path: string): [string, string] {
	if (path.startsWith('/chats/'))
		return ['Chat · Pulse', 'Private conversations on Pulse.']
	if (path.startsWith('/groups/'))
		return ['Group · Pulse', 'Group conversations on Pulse.']
	if (path.startsWith('/settings/security'))
		return [
			'Security Settings · Pulse',
			'Manage your Pulse account security and active sessions.',
		]
	if (path.startsWith('/settings/privacy'))
		return [
			'Privacy Policy · Pulse',
			'Learn how Pulse collects, uses, and protects your information.',
		]
	if (path.startsWith('/settings/changePassword'))
		return ['Change Password · Pulse', 'Update your Pulse account password.']
	if (path.startsWith('/settings/editProfile'))
		return ['Edit Profile · Pulse', 'Update your Pulse profile information.']
	if (path.startsWith('/settings'))
		return ['Settings · Pulse', 'Manage your Pulse account and preferences.']
	if (path.startsWith('/groupVideoCall/'))
		return ['Group Video Call · Pulse', 'Group video call on Pulse.']
	if (path.startsWith('/videoCall/'))
		return ['Video Call · Pulse', 'Video call on Pulse.']
	if (path.startsWith('/groupCall/'))
		return ['Group Call · Pulse', 'Group audio call on Pulse.']
	if (path.startsWith('/call/'))
		return ['Voice Call · Pulse', 'Voice call on Pulse.']
	const pages: Record<string, [string, string]> = {
		'/': [
			'Pulse · Connect with your world',
			'Pulse brings your conversations, groups, and calls together.',
		],
		'/login': [
			'Log In · Pulse',
			'Log in to your Pulse account to continue your conversations.',
		],
		'/signUp': [
			'Create Account · Pulse',
			'Create a Pulse account to chat, make groups, and call.',
		],
		'/forgotPassword': [
			'Forgot Password · Pulse',
			'Request a password reset link for your Pulse account.',
		],
		'/resetPassword': [
			'Reset Password · Pulse',
			'Set a new password for your Pulse account.',
		],
		'/setNewPassword': [
			'Reset Password · Pulse',
			'Set a new password for your Pulse account.',
		],
		'/verify': [
			'Verify Email · Pulse',
			'Verify your email address to finish setting up Pulse.',
		],
		'/calls': ['Calls · Pulse', 'Review your recent calls on Pulse.'],
		'/groups': [
			'Groups · Pulse',
			'Browse and manage your Pulse group conversations.',
		],
		'/chats': ['Chats · Pulse', 'Your private conversations on Pulse.'],
	}
	return (
		pages[path] ?? [
			'Page Not Found · Pulse',
			'The requested page could not be found on Pulse.',
		]
	)
}

function App() {
	const location = useLocation()
	const { data: session, isPending } = authClient.useSession()
	useAppSocket(!isPending && Boolean(session))

	const signUpMethods = useForm<SignUpType>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			confirmPassword: '',
			email: '',
			name: '',
			password: '',
		},
		mode: 'onSubmit',
	})
	const loginMethods = useForm<LoginType>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
		mode: 'onSubmit',
	})
	const chatSearchMethods = useForm<ChatSearch>({
		resolver: zodResolver(chatSearchSchema),
		defaultValues: {
			search: '',
		},
	})
	const groupCreationMethods = useForm<GroupCreation>({
		resolver: zodResolver(groupCreationSchema),
		defaultValues: {
			groupName: '',
			peopleToAdd: [],
		},
	})
	const changePasswordMethods = useForm<ChangePasswordType>({
		resolver: zodResolver(changePasswordSchema),
		defaultValues: {
			confirmPassword: '',
			currentPassword: '',
			password: '',
		},
	})

	const theme = useSelector((state: RootType) => state.theme.mode)

	useEffect(() => {
		if (theme === 'dark') {
			document.documentElement.classList.add('dark')
		} else {
			document.documentElement.classList.remove('dark')
		}
	}, [theme])

	useEffect(() => {
		const page = getPageMetadata(location.pathname)

		document.title = page[0]
		let description = document.querySelector<HTMLMetaElement>(
			'meta[name="description"]',
		)
		if (!description) {
			description = document.createElement('meta')
			description.name = 'description'
			document.head.append(description)
		}
		description.content = page[1]
	}, [location.pathname])

	const isMobile = useIsMobile()

	return (
		<>
			<Routes>
				<Route path='/' element={<Home />}>
					<Route index element={<SelectConvoUi />} />
					<Route
						path='/chats'
						element={
							<FormProvider {...chatSearchMethods}>
								<Chats />
							</FormProvider>
						}
					>
						<Route index element={isMobile ? null : <SelectConvoUi />} />
						<Route path=':chatId' element={<Chat />} />
					</Route>
					<Route
						path='/groups'
						element={
							<FormProvider {...groupCreationMethods}>
								<Groups />
							</FormProvider>
						}
					>
						<Route index element={isMobile ? null : <SelectConvoUi />} />
						<Route path=':groupId' element={<Group />} />
					</Route>
					<Route path='/calls' element={<Calls />}>
						<Route index element={isMobile ? null : <SelectConvoUi />} />
					</Route>
					<Route path='/settings' element={<Settings />}>
						<Route index element={isMobile ? null : <SelectConvoUi />} />
						<Route path='editProfile' element={<SetEditProfilePage />} />
						<Route path='security' element={<SetSecurityPage />} />
						<Route path='privacy' element={<PrivacyPolicy />} />
						<Route
							path='changePassword'
							element={
								<FormProvider {...changePasswordMethods}>
									<SetChangePassword />
								</FormProvider>
							}
						/>
					</Route>
				</Route>
				<Route
					path='/login'
					element={
						<FormProvider {...loginMethods}>
							<Login />
						</FormProvider>
					}
				/>
				<Route
					path='/signUp'
					element={
						<FormProvider {...signUpMethods}>
							<SignUp />
						</FormProvider>
					}
				/>
				<Route path='/call/:chatId' element={<Call />} />
				<Route path='/groupCall/:chatId' element={<GroupCall />} />
				<Route path='/videoCall/:chatId' element={<VideoCall />} />
				<Route path='/groupVideoCall/:chatId' element={<GroupVideoCall />} />
				<Route path='/forgotPassword' element={<ForgotPassword />} />
				<Route path='/setNewPassword' element={<SetNewPassword />} />
				<Route path='/resetPassword' element={<ResetPassword />} />
				<Route path='/verify' element={<Verify />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</>
	)
}

export default App
