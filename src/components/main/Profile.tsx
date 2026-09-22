import { Link } from 'react-router-dom'
import Avatar from './Avatar'

export default function Profile() {
	return (
		<Link to={'/settings'}>
			<Avatar />
		</Link>
	)
}
