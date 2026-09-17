import { Link } from 'react-router-dom'

export default function Profile() {
	return (
		
		<Link to={'/settings'} className="w-15 h-15 rounded-[50%] text-white flex justify-center items-center border-2 border-gray-700 relative">PFP <div className='w-3 h-3 bg-green-500 border border-white rounded-[50%] absolute right-0 top-[68%]' /></Link>
	)
}
