import request from 'supertest'
import app from '../server'
import User from '../server/api/models/user.model'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

describe('when not logged in', () => {
	test('/ should redirect to login', async done => {
		const res = await request(app).get('/')
		expect(res.statusCode).toEqual(302)
		expect(res.headers.location).toMatch('/login')
		done()
	})

	test('/login should serve login page', async done => {
		const res = await request(app).get('/login')
		expect(res.statusCode).toEqual(200)
		expect(res.text).toMatch('<h1>Login')
		done()
	})
})

describe('when authenticated', () => {
	let user
	let token

	beforeAll(async () => {
		user = await User.findOne()
		token = jwt.sign({ id: user._id }, process.env.SECRET || '')
	})

	test('/ should serve main page', async done => {
		const res = await request(app)
			.get('/')
			.set('Cookie', [`auth_token=${token}`])

		expect(res.text).toMatch('Tasks')
		done()
	})
})
