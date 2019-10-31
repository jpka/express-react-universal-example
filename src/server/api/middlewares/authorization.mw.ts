import jwt from 'express-jwt'
import Cookies from 'universal-cookie'
import { auth } from '../../../values.json'
import dotenv from 'dotenv'
dotenv.config()

export default jwt({
	secret: process.env.SECRET || '',
	getToken: req => {
		const cookies = new Cookies(req.headers.cookie)
		return cookies.get(auth.tokenKey)
	}
})
