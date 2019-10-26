import { snakeCase } from 'lodash'

export const actionType = (prefix, key) =>
	`${prefix}.${snakeCase(key)}`.toUpperCase()
export const successActionType = type => `${type}_SUCCESS`
export const generateTypes = (
	prefix: string,
	{ sync = [] as string[], async = [] as string[] }
) => {
	const typesObj: {
		[key: string]: any
	} = {}
	sync.forEach(key => (typesObj[key] = actionType(prefix, key)))
	async.forEach(key => {
		const type = actionType(prefix, key)
		typesObj[key] = {
			do: type,
			success: successActionType(type)
		}
	})
	return typesObj
}
