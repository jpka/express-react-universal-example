import mongoose, { Schema } from 'mongoose'

const schema = new Schema({ name: String, password: String })

schema.method('verifyPassword', function(password) {
	//@ts-ignore
	return this.get('password') === password
})

export interface User extends mongoose.Document {
	verifyPassword: (password: string) => boolean
}

export default mongoose.model<User>('User', schema)
