import { Router } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/user.model'
import { omit } from 'lodash'

export default Router()
	.post('/login', async (req, res) => {
		const user = await User.findOne({ username: req.body.username })
		if (!user) {
			return res.status(401).send({ error: 'User not found' })
		} else if (!user.verifyPassword(req.body.password)) {
			return res.status(401).send({ error: 'Password is incorrect' })
		} else {
			const token = jwt.sign({ id: user._id }, process.env.SECRET || '', {
				expiresIn: 86400 // expires in 24 hours
			})
			return res
				.status(200)
				.send({ token, user: omit(user.toJSON, ['password']) })
		}
	})
	.get('/logout', (req, res) => {
		req.logout()
		res.redirect('/')
	})
