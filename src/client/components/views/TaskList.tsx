import React, { Fragment } from 'react'
import Task from './Task'
import { Tasks } from '../../modules/tasks'

const TaskList = ({ tasks, onEach }: { tasks: Tasks; onEach? }) => {
	return (
		<Fragment>
			<h2>Tasks</h2>
			<ul>
				{tasks &&
					tasks.map((task, i) => (
						<li key={task._id}>
							<Task {...task} />
							{onEach && onEach(task, i)}
						</li>
					))}
			</ul>
		</Fragment>
	)
}

export default TaskList
