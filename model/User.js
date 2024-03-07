import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema({
	username: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	roles: [
		{ type: Number }
	],
	refreshToken: String,
})

export default mongoose.model('User', userSchema)