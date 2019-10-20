import React from 'react'
import App from '../App'
import { integratedRender } from './utils'
import { fireEvent } from '@testing-library/dom'

describe('Login', () => {
	const renderApp = () => integratedRender(<App />)
	const getUI = () => {
		const methods = renderApp()
		const { getByText, getByPlaceholderText } = methods
		return {
			signinButton: getByText('Sign in'),
			inputs: {
				username: getByPlaceholderText('username'),
				password: getByPlaceholderText('password')
			},
			...methods
		}
	}

	test('app lands in Login by default', () => {
		const { getByText } = getUI()
		expect(getByText('Login')).toBeInTheDocument()
	})

	describe('Validation', () => {
		describe('if fields are empty', () => {
			test('Login button is disabled', () => {
				expect(getUI().signinButton).toBeDisabled()
			})
			test('touching inputs and leaving them open shows an error msg', async () => {
				const { inputs, findByRole } = getUI()
				fireEvent.blur(inputs.username)
				expect(await findByRole('alert')).toBeInTheDocument()
			})
		})
		describe('if fields are filled', () => {
			let ui

			beforeAll(() => {
				ui = getUI()
				const { inputs } = ui
				fireEvent.change(inputs.username, { target: { value: 'juan' } })
				fireEvent.change(inputs.password, { target: { value: 'abc' } })
			})

			test('Login button is enabled if fields are filled', () => {
				expect(ui.signinButton).toBeEnabled()
			})
			test('there are no errors', () => {
				expect(ui.queryByRole('alert')).not.toBeInTheDocument()
			})
		})
	})
})
