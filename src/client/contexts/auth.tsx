import React, { createContext, useContext, FC, useState } from 'react'
import axios, { AxiosStatic } from 'axios'

axios.interceptors.response.use(undefined, err => {
	console.error(err, err.response)
	alert(err.response.data.message)
})

interface AuthContextProps {
	user?: any
	token?: string | null
	login?: any
	getUser?: () => Promise<any>
	logout?: () => void
	request: AxiosStatic
}

const storageKey = 'authToken'
const initialContextProps: AuthContextProps = { request: axios }
const AuthContext = createContext(initialContextProps)

const AuthProvider: FC = props => {
	let token: string | null = null

	// to prevent server render snafu
	if (typeof sessionStorage !== 'undefined') {
		token = sessionStorage.getItem(storageKey)
		if (token)
			axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
	}
	const [data, setData] = useState({ token, user: null })

	const login = async values => {
		try {
			const res = await axios.post('/api/auth/login', values)
			console.log('login response', res)
			const { token, user } = res.data
			sessionStorage.setItem(storageKey, token)
			setData({ token, user })
		} catch (e) {}
	}
	const getUser = async () => {
		try {
			const res = await axios.get('/api/auth/me')
			setData({ token, user: res.data.user })
		} catch (e) {
			logout()
		}
	}
	const logout = () => {
		sessionStorage.removeItem(storageKey)
		setData({ token: null, user: null })
	}

	if (token && !data.user) getUser()

	return (
		<AuthContext.Provider
			value={{
				user: data.user,
				token: data.token,
				getUser,
				login,
				logout,
				request: axios
			}}
			{...props}
		/>
	)
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }
