import { createStore, compose } from 'redux'
import { install as installLoop, StoreCreator } from 'redux-loop'
import rootReducer from './modules/reducer'

const enhancedCreateStore = createStore as StoreCreator
const composeEnhancers =
	(typeof window !== 'undefined' &&
		window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']) ||
	compose

export default (initialState?) =>
	enhancedCreateStore(
		rootReducer,
		initialState,
		composeEnhancers(installLoop())
	)
