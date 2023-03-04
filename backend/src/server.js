import path from 'path'
import express from 'express'
import 'dotenv/config'
import morgan from 'morgan'
import cors from 'cors'
import { notFound } from './api/middlewares/error.js'
import db from './config/db.js'
import loginRoute from '../src/api/routers/login.js'
import registerRoute from '../src/api/routers/register.js'
import todoRoute from '../src/api/routers/todo.js'

db()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())
app.use(
  cors()
)

app.use('/', loginRoute)
app.use('/', registerRoute)
app.use('/', todoRoute)

const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (_, res) =>
    res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (_, res) => {
    res.status(200).json({
      status: `Server running ${process.env.NODE_ENV} mode on post ${PORT}`,
    })
  })
}

app.use(notFound)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`Server running ${process.env.NODE_ENV} mode on post ${PORT}`)
)
