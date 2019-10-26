import React, { FC } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Login from './routes/Login'
import Main from './routes/Main'
import { useSelector } from 'react-redux'
import { AuthState } from '../modules/auth'

const Router: FC = () => {
	const token = useSelector(({ auth }: { auth: AuthState }) => auth.token)
	return (
		<Switch>
			<Route
				exact
				path="/login"
				render={() => (!token ? <Login /> : <Redirect to="/" />)}
			/>
			<Route
				exact
				path="/"
				render={() => (token ? <Main /> : <Redirect to="/login" />)}
			/>
		</Switch>
	)
}

export default Router
