import produce from 'immer'
import { loop, Cmd, LoopReducer } from 'redux-loop'
import axios from 'axios'
import actions, { types } from './actions'
import { Tasks } from './index'
import commonActions from '../actions'

const apiUrl = '/api/tasks'

const tasksReducer: LoopReducer<any> = produce((draft: Tasks, action) => {
	switch (action.type) {
		case types.getAll.do:
			return loop(
				draft,
				Cmd.run(() => axios.get(apiUrl), {
					successActionCreator: actions.getAll.success,
					failActionCreator: commonActions.requestFailure
				})
			)
		case types.getAll.success:
			return action.payload.tasks
		case types.add.do:
			return loop(
				draft,
				Cmd.run(() => axios.post(apiUrl, action.payload), {
					successActionCreator: actions.add.success,
					failActionCreator: commonActions.requestFailure
				})
			)
		case types.add.success:
			if (draft) {
				draft.push(action.payload.task)
			} else {
				draft = [action.payload.task]
			}
			return draft
		case types.remove.do:
			return loop(
				draft,
				Cmd.run(() => axios.delete(`${apiUrl}/${action.payload.id}`), {
					successActionCreator: () =>
						actions.remove.success(action.payload.index),
					failActionCreator: commonActions.requestFailure
				})
			)
		case types.remove.success:
			if (draft) draft.splice(action.payload.index, 1)
			return draft
	}
})

export default tasksReducer
