import mongoose, { Schema } from 'mongoose'

const schema = new Schema({
	description: String,
	dueDate: Date,
	user: { type: Schema.Types.ObjectId, ref: 'User' }
})

export default mongoose.model('Task', schema)
