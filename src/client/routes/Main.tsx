import React, { FC } from 'react'
import { useAuth } from '../contexts/auth'
import UserTasks from '../containers/UserTasks'

const Main: FC = () => {
	const { user, logout } = useAuth()

	return (
		<div>
			{user && (
				<div>
					<h1>
						{user.name} ({user.username})
					</h1>
					<button onClick={logout}>Logout</button>
				</div>
			)}
			<UserTasks />
		</div>
	)
}

export default Main
