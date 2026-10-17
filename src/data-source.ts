import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from './entity/User'
import { Task } from './entity/Task'
import { TaskActivity } from './entity/TaskActivity'

export const AppDataSource = new DataSource({
  type: 'better-sqlite3',
  database: 'task_api.sqlite',
  synchronize: true,
  logging: false,
  entities: [User, Task, TaskActivity],
})
