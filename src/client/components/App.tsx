import React, { FC } from 'react'
import { Provider } from 'react-redux'
import createStore from '../store'
import Router from './Router'
import './App.css'
import cookieSvc from '../services/cookies'

const App: FC<{ ssrCookies?: string }> = ({ ssrCookies }) => {
	if (ssrCookies) cookieSvc.init(ssrCookies)
	return (
		<Provider store={createStore()}>
			<Router />
		</Provider>
	)
}

export default App
