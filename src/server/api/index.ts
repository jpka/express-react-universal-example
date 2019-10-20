import { Router } from 'express'
import authCtrl from './controllers/auth.ctrl'
import tasksCtrl from './controllers/tasks.ctrl'

export default Router()
	.get('/status', (req, res) => {
		res.json({ message: 'OK', timestamp: new Date().toISOString() })
	})
	.use('/auth', authCtrl)
	.use('/tasks', tasksCtrl)
