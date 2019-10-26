import { loop, Cmd } from 'redux-loop'
import actions, { types } from './actions'
import commonActions from '../actions'
import axios from 'axios'
import cookieSvc from '../../services/cookies'
import { AuthState } from './index'

const tokenKey = 'auth_token'
const cookies = cookieSvc.cookies

export default (
	state: AuthState = { token: cookies.get(tokenKey) },
	action
) => {
	switch (action.type) {
		case '@@INIT':
			if (state.token && !state.user) {
				return loop({ ...state }, Cmd.action(actions.getUser.do()))
			} else {
				return state
			}
		case types.login.do:
			return loop(
				{ ...state },
				Cmd.run(() => axios.post('/api/auth/login', action.payload), {
					successActionCreator: actions.login.success,
					failActionCreator: commonActions.requestFailure
				})
			)
		case types.login.success:
			cookies.set(tokenKey, action.payload.token)
			return action.payload
		case types.getUser.do:
			return loop(
				{ ...state },
				Cmd.run(() => axios.get('/api/auth/me'), {
					successActionCreator: actions.getUser.success,
					failActionCreator: commonActions.requestFailure
				})
			)
		case types.getUser.success:
			return { ...state, user: action.payload.user }
		case types.logout:
			cookies.remove(tokenKey)
			return {}
		default:
			return state
	}
}
