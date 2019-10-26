import { combineReducers } from 'redux-loop'
import { types } from './actions'
import authReducer from './auth/reducer'
import tasksReducer from './tasks/reducer'

const notifyError = error => {
	if (typeof document === 'undefined') return
	console.error(error, error.response)
	alert(error.response.data.message)
}

export default combineReducers({
	auth: authReducer,
	tasks: tasksReducer,
	common: (state, action) => {
		switch (action.type) {
			case types.requestFailure:
				notifyError(action.payload.error)
				return state
			default:
				return state
		}
	}
})
