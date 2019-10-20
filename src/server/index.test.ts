import request from 'supertest'
import app from './index'

test('/login should serve the base html', async () => {
	const res = await request(app).get('/login')
	expect(res.statusCode).toEqual(200)
	expect(res.text).toMatch(`<div id="root">`)
})
