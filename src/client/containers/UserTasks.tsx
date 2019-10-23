import React, { FC, useEffect, useState } from 'react'
import { useAuth } from '../contexts/auth'
import TaskList from '../components/TaskList'
import TaskForm from '../components/forms/TaskForm'

const UserTasks: FC = () => {
	const [tasks, setTasks] = useState([])
	const [populated, setPopulated] = useState(false)
	const { request, user } = useAuth()

	const populate = () => {
		request.get('/api/tasks').then(({ data }) => setTasks(data.tasks))
		setPopulated(true)
	}

	const addTask = async values => {
		const res = await request.post('/api/tasks', {
			task: { user: user._id, ...values }
		})
		setTasks(tasks.concat(res.data.task))
	}

	const removeTask = async (task, index) => {
		await request.delete(`/api/tasks/${task._id}`)
		const newTasks = [...tasks]
		newTasks.splice(index, 1)
		setTasks(newTasks)
	}

	useEffect(() => {
		if (!populated) populate()
	})

	return (
		<div>
			<TaskList
				tasks={tasks}
				onEach={(task, i) => (
					<button onClick={() => removeTask(task, i)}>X</button>
				)}
			/>
			<TaskForm onSubmit={addTask} buttonText="Add" />
		</div>
	)
}

export default UserTasks
