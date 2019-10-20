import React, { FC, useEffect, useState } from 'react'
import { useAuth } from '../contexts/auth'
import TaskList from '../components/TaskList'
import TaskForm from '../components/forms/TaskForm'

const UserTasks: FC = () => {
	const [tasks, setTasks] = useState(null)
	const { request, user } = useAuth()

	const populate = () =>
		request.get('/api/tasks').then(({ data }) => setTasks(data.tasks))

	useEffect(() => {
		if (tasks) return
		populate()
	})

	const addTask = async values => {
		await request.post('/api/tasks', { task: { user: user._id, ...values } })
		populate()
	}

	const removeTask = async task => {
		await request.delete(`/api/tasks/${task._id}`)
		populate()
	}

	return (
		<div>
			<TaskList
				tasks={tasks || []}
				onEach={task => <button onClick={() => removeTask(task)}>X</button>}
			/>
			<TaskForm onSubmit={addTask} buttonText="Add" />
		</div>
	)
}

export default UserTasks
