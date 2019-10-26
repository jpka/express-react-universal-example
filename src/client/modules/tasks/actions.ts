import { Task } from './index'
import { generateTypes } from '../utils'

export const types = generateTypes('TASKS', {
	async: ['getAll', 'add', 'remove']
})

export default {
	getAll: {
		do: () => ({ type: types.getAll.do }),
		success: ({ data }) => ({
			type: types.getAll.success,
			payload: { tasks: data.tasks }
		})
	},
	add: {
		do: ({ description, dueDate }: Partial<Task>) => ({
			type: types.add.do,
			payload: { task: { description, dueDate } }
		}),
		success: ({ data }) => ({
			type: types.add.success,
			payload: { task: data.task }
		})
	},
	remove: {
		do: (id: string, index: number) => ({
			type: types.remove.do,
			payload: { id, index }
		}),
		success: (index: number) => ({
			type: types.remove.success,
			payload: { index }
		})
	}
}
