import { useNavigate } from 'react-router-dom'

export default function BackToSignUp() {
	const navigate = useNavigate()
	return (
		<button onClick={() => navigate('/signUp')} className='text-[#6B6B80] text-sm hover:text-white flex justify-center items-center cursor-pointer'>&#8592; Back to Sign Up</button>
	)
}
