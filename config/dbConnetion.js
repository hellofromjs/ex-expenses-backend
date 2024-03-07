import mongoose from 'mongoose'

const connectDB = async (cb) => {
	try {
		const conn = await mongoose.connect(process.env.DATABASE_URI)
		console.log(`MongoDB Connected: ${conn.connection.host}`)
		cb()
	} catch (error) {
		console.error(error)
		process.exit(1)
	}
}

export default connectDB