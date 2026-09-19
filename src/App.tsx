import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { FormProvider, useForm } from 'react-hook-form'
import { signUpSchema, type SignUpType } from './schemas/auth/signUp'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginType } from './schemas/auth/login'
import NotFound from './pages/NotFound'
import ForgotPassword from './pages/ForgotPassword'
import Verify from './pages/Verify'
import ResetPassword from './pages/ResetPassword'
import Chats from './pages/Chats'
import { chatSearchSchema, type ChatSearch } from './schemas/main/chatSearch'

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
	return (
		<>
			<Routes>
				<Route path='/' element={<Home />}>
					<Route
						path='/chats'
						element={
							<FormProvider {...chatSearchMethods}>
								<Chats />
							</FormProvider>
						}
					></Route>
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
