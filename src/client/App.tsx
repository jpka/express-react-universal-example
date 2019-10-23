import React, { FC } from 'react'
import { AuthProvider } from './contexts/auth'
import Router from './Router'
import './App.css'

const App: FC<{ ssrCookies?: string }> = ({ ssrCookies }) => {
	return (
		<AuthProvider ssrCookies={ssrCookies}>
			<Router />
		</AuthProvider>
	)
}

export default App
