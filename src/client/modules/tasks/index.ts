export interface Task {
	_id?: string
	user: string
	description: string
	dueDate: Date
}

export type Tasks = Task[] | null
