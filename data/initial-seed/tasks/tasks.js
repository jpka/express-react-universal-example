import { ObjectId } from 'mongodb'

module.exports = [
	{
		description: 'Lorem',
		dueDate: new Date(),
		user: ObjectId('5dac568159d072797c4e5467')
	},
	{
		description: 'Ipsum',
		dueDate: new Date(2020, 1, 1),
		user: ObjectId('5dac568159d072797c4e5467')
	},
	{
		description: 'Dolor',
		dueDate: new Date(2021, 3, 4),
		user: ObjectId('5dac568159d072797c4e5468')
	},
	{
		description: 'Consectetur',
		dueDate: new Date(2222, 2, 2),
		user: ObjectId('5dac568159d072797c4e5468')
	}
]
