import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { Form, FormProvider, useForm } from 'react-hook-form'
import { signUpSchema, type SignUpType } from './schemas/auth/signUp'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginType } from './schemas/auth/login'

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
			<FormProvider {...signUpMethods}>
				<FormProvider {...loginMethods}>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/login' element={<Login />} />
						<Route path='/signUp' element={<SignUp />} />
					</Routes>
				</FormProvider>
			</FormProvider>
		</>
	)
}

export default App
