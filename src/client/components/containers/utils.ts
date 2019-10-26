import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { ActionCreator, bindActionCreators } from 'redux'

export const useActions = (actions: ActionCreator<any>[] = []) => {
	const dispatch = useDispatch()
	return useMemo(
		() => actions.map(action => bindActionCreators(action, dispatch)),
		[dispatch]
	)
}
