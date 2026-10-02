import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { Route, Routes } from 'react-router-dom'
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
import { useGSAP } from '@gsap/react'
import { authClient } from './lib/auth-client'
import gsap from 'gsap'

function App() {
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
			search: '',
			peopleToAdd: [],
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

	const isMobile = useIsMobile()
	const { isPending } = authClient.useSession()

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
						<Route
							path='editProfile'
							element={
								<FormProvider {...groupCreationMethods}>
									<SetEditProfilePage />
								</FormProvider>
							}
						/>
						<Route
							path='security'
							element={
								<FormProvider {...groupCreationMethods}>
									<SetSecurityPage />
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
				<Route path='/forgotPassword' element={<ForgotPassword />} />
				<Route path='/resetPassword' element={<ResetPassword />} />
				<Route path='/verify' element={<Verify />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</>
	)
}

export default App
