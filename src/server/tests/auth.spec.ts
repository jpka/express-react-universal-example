import request from 'supertest'
import app from '../index'
import dotenv from 'dotenv'
dotenv.config()

const users = {
	valid: { username: 'juan', password: 'secret' },
	invalid: { username: 'invalid', password: 'login' }
}
const auth = (path: string) => `/api/auth${path}`

describe('/api', () => {
	describe('/auth', () => {
		describe('/login', () => {
			const endpoint = auth('/login')
			const req = () => request(app).post(endpoint)

			it('returns a token when login is valid', async () => {
				const res = await req().send(users.valid)
				expect(res.statusCode).toEqual(200)
				expect(res.body).toHaveProperty('token')
				expect(res.body).toHaveProperty('user')
				expect(res.body.user).not.toHaveProperty('password')
			})

			it('fails when user is invalid', async () => {
				const res = await req().send(users.invalid)
				expect(res.statusCode).toEqual(401)
				expect(res.body).toHaveProperty('message')
			})
		})
	})
})
