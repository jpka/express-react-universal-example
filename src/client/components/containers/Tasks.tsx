import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import TaskList from '../views/TaskList'
import TaskForm from '../forms/TaskForm'
import taskActions from '../../modules/tasks/actions'
import { Tasks } from '../../modules/tasks'
import { useActions } from './utils'

const TasksContainer: FC = () => {
	const tasks = useSelector(({ tasks }: { tasks: Tasks }) => tasks)
	const [getAll, add, remove] = useActions([
		taskActions.getAll.do,
		taskActions.add.do,
		taskActions.remove.do
	])
	if (!tasks) getAll()

	return (
		<div>
			<TaskList
				tasks={tasks}
				onEach={(task, i) => (
					<button onClick={() => remove(task._id, i)}>X</button>
				)}
			/>
			<TaskForm onSubmit={add} buttonText="Add" />
		</div>
	)
}

export default TasksContainer
