import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { Form, FormProvider, useForm } from 'react-hook-form'
import { signUpSchema, type SignUpType } from './schemas/auth/signUp'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginType } from './schemas/auth/login'
import NotFound from './pages/NotFound'

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

	return (
		<>
			<Routes>
				<Route path='/' element={<Home />} />
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
				<Route path='*' element={<NotFound />} />
			</Routes>
		</>
	)
}

export default App
