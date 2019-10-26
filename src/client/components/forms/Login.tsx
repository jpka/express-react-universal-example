/* eslint-disable react/prop-types */
import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { LoginData } from '../../modules/auth'

const schema = Yup.object().shape({
	username: Yup.string().required('Username is required'),
	password: Yup.string().required('Password is required')
})

const LoginForm = ({
	onSubmit,
	initialValues = {
		username: '',
		password: ''
	} as LoginData
}) => (
	<Formik
		initialValues={initialValues}
		onSubmit={onSubmit}
		validationSchema={schema}
	>
		{({ isValid, errors, touched }) => (
			<Form>
				<Field
					component="input"
					name="username"
					type="text"
					placeholder="username"
				/>
				{errors.username && touched.username ? (
					<div className="error" role="alert">
						{errors.username}
					</div>
				) : null}
				<Field
					component="input"
					name="password"
					type="password"
					placeholder="password"
				/>
				{errors.password && touched.password ? (
					<div className="error" role="alert">
						{errors.password}
					</div>
				) : null}
				<button type="submit" disabled={!isValid}>
					Sign in
				</button>
			</Form>
		)}
	</Formik>
)

export default LoginForm
