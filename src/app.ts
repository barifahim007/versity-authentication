import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userRouter from './app/modules/user/user.router'
import globalErrorHandler from './app/middleware/globalErrorHandler'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// application route
app.use('/api/v1/user', userRouter)

// global error handler
app.use(globalErrorHandler)

// cookie parser
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('Ramadan mubarak!!!!!!')
})

export default app
