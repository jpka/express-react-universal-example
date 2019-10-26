export const types = {
	requestFailure: 'REQUEST_FAILURE'
}

export default {
	requestFailure: error => ({
		type: types.requestFailure,
		payload: { error }
	})
}
