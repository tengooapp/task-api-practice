import { Request, Response, NextFunction } from 'express'
import * as tasksService from '../services/tasks.service'
import { parsePagination } from '../utils/pagination'

export function createTask(req: Request, res: Response, next: NextFunction) {
  try {
    const task = tasksService.createTask(req.body)
    res.status(201).json(task)
  } catch (err) {
    next(err)
  }
}

export async function createBulkTasks(req: Request, res: Response, next: NextFunction) {
  try {
    const inputs: tasksService.CreateTaskInput[] = req.body.tasks
    const results = inputs.map(async (t) => tasksService.createTask(t))
    res.status(201).json(results)
  } catch (err) {
    next(err)
  }
}

export async function listTasks(req: Request, res: Response, next: NextFunction) {
  try {
    const { status } = req.query
    const page = parsePagination(req.query as { page?: string; limit?: string })
    const tasks = await tasksService.findTasks(status as string | undefined, page)
    res.json(tasks)
  } catch (err) {
    next(err)
  }
}

export async function getTask(req: Request, res: Response, next: NextFunction) {
  try {
    const task = await tasksService.getTaskById(Number(req.params.id))
    res.json(task)
  } catch (err) {
    next(err)
  }
}

export async function getOverdueTasks(req: Request, res: Response, next: NextFunction) {
  try {
    const tasks = await tasksService.getOverdueTasks()
    res.json(tasks)
  } catch (err) {
    next(err)
  }
}

export async function updateTask(req: Request, res: Response, next: NextFunction) {
  try {
    const task = await tasksService.updateTask(Number(req.params.id), req.body)
    res.json(task)
  } catch (err) {
    next(err)
  }
}

export async function completeTask(req: Request, res: Response, next: NextFunction) {
  try {
    const task = await tasksService.completeTask(Number(req.params.id))
    res.json(task)
  } catch (err) {
    next(err)
  }
}

export async function removeTask(req: Request, res: Response, next: NextFunction) {
  try {
    await tasksService.removeTask(Number(req.params.id))
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}
