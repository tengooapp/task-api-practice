import 'reflect-metadata'
import express from 'express'
import { PORT } from './config'
import { AppDataSource } from './data-source'
import usersRouter from './routes/users.routes'
import tasksRouter from './routes/tasks.routes'
import { errorHandler } from './middleware/errorHandler'

const app = express()
app.use(express.json())

app.use('/users', usersRouter)
app.use('/tasks', tasksRouter)

app.use(errorHandler)

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Task API listening on port ${PORT}`)
    })
  })
  .catch((err) => {
    console.error('Failed to initialize data source', err)
    process.exit(1)
  })
