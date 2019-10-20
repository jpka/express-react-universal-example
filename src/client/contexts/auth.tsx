import React, { createContext, useContext, FC, useState } from 'react'
import axios from 'axios'

interface AuthContextProps {
	user?: any
	token?: string | null
	login?: (values: any) => void
	logout?: () => void
}

const storageKey = 'authToken'
const initialContextProps: AuthContextProps = {}
const AuthContext = createContext(initialContextProps)

const AuthProvider: FC = props => {
	let token: string | null = null
	// to prevent server render snafu
	if (typeof sessionStorage !== 'undefined') {
		token = sessionStorage.getItem(storageKey)
	}
	const [data, setData] = useState({ token, user: null })

	const login = async values => {
		const res = await axios.post('/api/auth/login', values)
		console.log('login response', res)
		sessionStorage.setItem(storageKey, res.data.token)
		const { token, user } = res.data
		setData({ token, user })
	}
	const logout = () => {} // clear the token in localStorage and the user data

	return (
		<AuthContext.Provider
			value={{ user: data.user, token: data.token, login, logout }}
			{...props}
		/>
	)
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }
