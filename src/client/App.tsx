import React, { FC } from 'react'
import { AuthProvider } from './contexts/auth'
import Router from './Router'
import './App.css'

const App: FC = () => {
	return (
		<AuthProvider>
			<Router />
		</AuthProvider>
	)
}

export default App
