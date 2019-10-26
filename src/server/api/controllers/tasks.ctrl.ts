import { Router } from 'express'
import Task from '../models/task.model'
import authorization from '../middlewares/authorization.mw'
import dotenv from 'dotenv'
dotenv.config()

const handleError = (err, res) => res.status(500).send({ message: err.message })

export default Router()
	.get('/', authorization, async (req: any, res) => {
		try {
			const tasks = await Task.find({ user: req.user.id }).exec()
			res.status(200).send({ tasks })
		} catch (err) {
			handleError(err, res)
		}
	})
	.post('/', authorization, async (req: any, res) => {
		try {
			const newTask = await Task.create([
				{ user: req.user.id, ...req.body.task }
			])
			res.status(200).send({ task: newTask[0] })
		} catch (err) {
			handleError(err, res)
		}
	})
	.delete('/:id', authorization, async (req, res) => {
		try {
			const task = await Task.findById(req.params.id)
			if (task) await task.remove()
			res.status(204).end()
		} catch (err) {
			handleError(err, res)
		}
	})
	.put('/:id', authorization, async (req, res) => {
		try {
			const task = await Task.findById(req.params.id)
			if (task) task.update(req.body.data)
			res.status(200).send({ task })
		} catch (err) {
			handleError(err, res)
		}
	})
