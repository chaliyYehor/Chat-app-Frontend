import { Link } from 'react-router-dom'

export default function BackToSignUp() {
	return (
		<Link
			to='/signUp'
			className='text-[#6B6B80] text-sm hover:text-white flex justify-center items-center'
		>
			<span aria-hidden='true'>&#8592;</span>&nbsp;Back to Sign Up
		</Link>
	)
}
