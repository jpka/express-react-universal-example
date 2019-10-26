import { combineReducers } from 'redux-loop'
import { types } from './actions'
import authReducer from './auth/reducer'
import tasksReducer from './tasks/reducer'

export default combineReducers({
	auth: authReducer,
	tasks: tasksReducer,
	common: (state, action) => {
		switch (action.type) {
			case types.requestFailure:
				const { error } = action.payload
				console.error(error, error.response)
				alert(error.response.data.message)
				return state
			default:
				return state
		}
	}
})
