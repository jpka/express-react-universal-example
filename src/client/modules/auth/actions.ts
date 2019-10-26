import { generateTypes } from '../utils'
import { LoginData } from './index'

export const types = generateTypes('AUTH', {
	async: ['login', 'getUser'],
	sync: ['logout']
})

export default {
	login: {
		do: (loginData: LoginData) => ({
			type: types.login.do,
			payload: loginData
		}),
		success: ({ data }) => ({
			type: types.login.success,
			payload: data
		})
	},
	logout: () => ({ type: types.logout }),
	getUser: {
		do: () => ({ type: types.getUser.do }),
		success: ({ data }) => ({
			type: types.getUser.success,
			payload: { user: data.user }
		})
	}
}
