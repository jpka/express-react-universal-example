import React, { FC } from 'react'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import { useAuth } from '../contexts/auth'

const Login: FC = () => {
	const { login } = useAuth()
	const schema = Yup.object().shape({
		username: Yup.string().required('Username is required'),
		password: Yup.string().required('Password is required')
	})

	return (
		<div>
			<h1>Login</h1>
			<Formik
				initialValues={{
					username: '',
					password: ''
				}}
				onSubmit={login}
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
		</div>
	)
}

export default Login
