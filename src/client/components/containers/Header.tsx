import React, { FC, Fragment } from 'react'
import { useSelector } from 'react-redux'
import { useActions } from './utils'
import authActions from '../../modules/auth/actions'
import { AuthState } from '../../modules/auth'

const HeaderContainer: FC = () => {
	const user = useSelector(({ auth }: { auth: AuthState }) => auth.user)
	const [logout] = useActions([authActions.logout])

	return (
		<div>
			{user && (
				<Fragment>
					<h1>
						{user.name} ({user.username})
					</h1>
					<button onClick={logout}>Logout</button>
				</Fragment>
			)}
		</div>
	)
}

export default HeaderContainer
