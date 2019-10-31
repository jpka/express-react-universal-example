import { Router } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/user.model'
import authorization from '../middlewares/authorization.mw'
import { omit } from 'lodash'
import { auth } from '../../../values.json'
import dotenv from 'dotenv'
dotenv.config()

export default Router()
	.post('/login', async (req, res) => {
		const user = await User.findOne({ username: req.body.username })
		if (!user) {
			return res.status(401).send({ message: 'User not found' })
		} else if (!user.verifyPassword(req.body.password)) {
			return res.status(401).send({ message: 'Password is incorrect' })
		} else {
			const token = jwt.sign({ id: user._id }, process.env.SECRET || '', {
				expiresIn: 86400 // expires in 24 hours
			})
			return res
				.status(200)
				.send({ token, user: omit(user.toJSON(), ['password']) })
		}
	})
	.get('/me', authorization, async (req: any, res) => {
		const user = await User.findById(req.user.id)
		if (!user) return res.status(404).send({ message: 'User not found' })
		return res.status(200).send({ user: user })
	})
	.get('/logout', (req, res) => {
		res.clearCookie(auth.tokenKey)
		res.redirect('/login')
	})
