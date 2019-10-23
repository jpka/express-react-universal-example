import React, { FC } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Login from './routes/Login'
import Main from './routes/Main'
import { useAuth } from './contexts/auth'

const Router: FC = () => {
	const { token } = useAuth()
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
