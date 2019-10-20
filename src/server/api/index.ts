import { Router } from 'express'
import authCtrl from './controllers/auth.ctrl'

export default Router()
	.get('/status', (req, res) => {
		res.json({ message: 'OK', timestamp: new Date().toISOString() })
	})
	.use('/auth', authCtrl)
