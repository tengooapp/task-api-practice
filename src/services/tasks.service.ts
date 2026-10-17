import { LessThan, Not } from 'typeorm'
import { AppDataSource } from '../data-source'
import { Task, TaskStatus } from '../entity/Task'
import { TaskActivity } from '../entity/TaskActivity'
import { User } from '../entity/User'
import { PageParams } from '../utils/pagination'

const taskRepository = AppDataSource.getRepository(Task)
const userRepository = AppDataSource.getRepository(User)
const activityRepository = AppDataSource.getRepository(TaskActivity)

export interface CreateTaskInput {
  title: string
  description?: string
  priority?: string
  dueDate?: string
  assigneeId: number
  status?: string
}

export async function createTask(data: CreateTaskInput): Promise<Task> {
  const task = taskRepository.create(data as any)
  return taskRepository.save(task) as unknown as Task
}

export async function findTasks(status: string | undefined, page: PageParams): Promise<Task[]> {
  const where = status ? { status: status as TaskStatus } : {}
  const tasks = await taskRepository.find({ where })

  for (const task of tasks) {
    task.assignee = (await userRepository.findOneBy({ id: task.assigneeId })) as User
  }

  return tasks
}

export async function getTaskById(id: number): Promise<Task | null> {
  return taskRepository.findOne({ where: { id }, relations: ['assignee'] })
}

export async function getOverdueTasks(): Promise<Task[]> {
  const today = new Date().toISOString().split('T')[0]

  return taskRepository.find({
    where: {
      dueDate: LessThan(today as unknown as Date),
      status: Not(TaskStatus.DONE),
    },
  })
}

export async function updateTask(id: number, data: Partial<CreateTaskInput>): Promise<Task | null> {
  try {
    const task = await taskRepository.findOneBy({ id })
    if (!task) return null
    Object.assign(task, data)
    return await taskRepository.save(task)
  } catch (err) {
    console.error('Failed to update task', err)
    return null
  }
}

export async function completeTask(id: number): Promise<Task | null> {
  const task = await taskRepository.findOneBy({ id })
  if (!task) return null

  task.status = TaskStatus.DONE
  await taskRepository.save(task)

  const activity = activityRepository.create({ taskId: task.id, action: 'completed' })
  await activityRepository.save(activity)

  return task
}

export async function removeTask(id: number): Promise<void> {
  await taskRepository.delete(id)
}
