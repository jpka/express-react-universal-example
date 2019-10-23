import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	FC
} from 'react'
import axios, { AxiosStatic } from 'axios'
import Cookies from 'universal-cookie'

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

const cookieKey = 'auth_token'
const initialContextProps: AuthContextProps = { request: axios }
const AuthContext = createContext(initialContextProps)

const AuthProvider: FC<{ ssrCookies?: string }> = ({
	ssrCookies,
	...props
}) => {
	const cookies = new Cookies(ssrCookies)
	const token: string | null = cookies.get(cookieKey)
	if (ssrCookies) {
		axios.defaults.headers.common['Cookie'] = `${cookieKey}=${token}`
	}
	const [user, setUser] = useState(null)

	const login = async values => {
		try {
			const res = await axios.post('/api/auth/login', values)
			console.log('login response', res)
			const { token, user } = res.data
			cookies.set(cookieKey, token)
			setUser(user)
		} catch (e) {}
	}
	const getUser = async () => {
		try {
			const res = await axios.get('/api/auth/me')
			setUser(res.data.user)
		} catch (e) {
			logout()
		}
	}
	const logout = () => {
		cookies.remove(cookieKey)
		setUser(null)
	}

	useEffect(() => {
		if (token && !user) getUser()
	})

	return (
		<AuthContext.Provider
			value={{
				user: user,
				token: token,
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
