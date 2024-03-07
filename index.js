import 'dotenv/config'

import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import connectDB from './config/dbConnetion.js'
import corsOptions from './config/corsOptions.js'
import credentials from './middleware/credentials.js'

import registerRoute from './routes/register.js'
import loginRoute from './routes/login.js'
import refreshRoute from './routes/refresh.js'
import logoutRoute from './routes/logout.js'
import expenseCategoryRoute from './routes/expenseCategories.js'
import expenseRoute from './routes/expense.js'

const __dirname = import.meta.dirname

if (!process.env.DATABASE_URI) {
	console.log('Missing required environment variable: DATABASE_URI. Check .env.example file for available values')
	process.exit(1)
} else if (!process.env.REFRESH_TOKEN_SECRET) {
	console.log('Missing required environment variable: REFRESH_TOKEN_SECRET. Check .env.example file for available values')
	process.exit(1)
} else if (!process.env.ACCESS_TOKEN_SECRET) {
	console.log('Missing required environment variable: ACCESS_TOKEN_SECRET. Check .env.example file for available values')
	process.exit(1)
}

const app = express()
const PORT = process.env.PORT || 3500

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials)

// Cross Origin Resource Sharing
app.use(cors(corsOptions))

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }))

// built-in middleware to handle json data
app.use(express.json())

// middleware to handle cookies
app.use(cookieParser())

// serve static files
app.use('/', express.static(path.join(__dirname, 'public')))

// routes
app.use('/api/v1/login', loginRoute)
app.use('/api/v1/register', registerRoute)
app.use('/api/v1/logout', logoutRoute)
app.use('/api/v1/refresh', refreshRoute)
app.use('/expense-caregories', expenseCategoryRoute)
app.use('/expenses', expenseRoute)


// connect to database
connectDB(() => {
	app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`))
})
