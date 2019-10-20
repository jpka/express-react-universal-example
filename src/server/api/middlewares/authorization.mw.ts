import jwt from 'express-jwt'

export default jwt({ secret: process.env.SECRET || '' })
