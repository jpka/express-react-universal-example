import React, { FC } from 'react'
import HeaderContainer from '../containers/Header'
import TasksContainer from '../containers/Tasks'

const Main: FC = () => {
	return (
		<div>
			<HeaderContainer />
			<TasksContainer />
		</div>
	)
}

export default Main
