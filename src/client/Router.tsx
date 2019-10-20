import React, { FC } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Login from './routes/Login'
import Main from './routes/Main'
import { useAuth } from './contexts/auth'

const Router: FC = () => {
	const { user } = useAuth()
	return (
		<Switch>
			<Route
				exact
				path="/login"
				render={() => (!user ? <Login /> : <Redirect to="/" />)}
			/>
			<Route
				exact
				path="/"
				render={() => (user ? <Main /> : <Redirect to="/login" />)}
			/>
		</Switch>
	)
}

export default Router
