import React from 'react'

const Task = ({ description, dueDate }: any) => {
	return (
		<div>
			<p>{description}</p>
			<p>Due: {new Date(dueDate).toLocaleDateString()}</p>
		</div>
	)
}

export default Task
