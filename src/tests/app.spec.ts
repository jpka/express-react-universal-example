import request from 'supertest'
import app from '../server'

test('/ should redirect to login', async () => {
	const res = await request(app).get('/')
	expect(res.statusCode).toEqual(302)
	expect(res.headers.location).toMatch('/login')
})
