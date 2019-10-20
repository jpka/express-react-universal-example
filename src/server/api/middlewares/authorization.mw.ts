import jwt from 'express-jwt'
import dotenv from 'dotenv'
dotenv.config()

export default jwt({ secret: process.env.SECRET || '' })
