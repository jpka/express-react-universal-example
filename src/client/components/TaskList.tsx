import React, { Fragment } from 'react'
import Task from './Task'

const TaskList = ({ tasks, onEach }: { tasks: any[]; onEach? }) => {
	return (
		<Fragment>
			<h2>Tasks</h2>
			<ul>
				{tasks.map((task, i) => (
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
