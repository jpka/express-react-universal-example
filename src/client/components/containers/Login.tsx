import React, { FC } from 'react'
import authActions from '../../modules/auth/actions'
import { useActions } from './utils'
import LoginForm from '../forms/Login'

const LoginContainer: FC = () => {
	const [login] = useActions([authActions.login.do])

	return (
		<div>
			<LoginForm onSubmit={login} />
		</div>
	)
}

export default LoginContainer
