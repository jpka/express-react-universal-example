/* eslint-disable react/prop-types */
import React from 'react'
import { Formik, Form, Field } from 'formik'

const TaskForm = ({
	onSubmit,
	initialValues = {
		description: '',
		dueDate: new Date().toLocaleDateString('en-CA')
	},
	buttonText = 'Submit'
}) => {
	return (
		<Formik onSubmit={onSubmit} initialValues={initialValues}>
			{() => (
				<Form>
					<Field component="input" type="text" name="description" />
					<Field component="input" type="date" name="dueDate" />
					<button type="submit">{buttonText}</button>
				</Form>
			)}
		</Formik>
	)
}

export default TaskForm
