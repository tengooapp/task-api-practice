import { Request, Response, NextFunction } from 'express'
import * as usersService from '../services/users.service'

export async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await usersService.createUser(req.body)
    res.status(201).json(user)
  } catch (err) {
    next(err)
  }
}

export async function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await usersService.getUserById(Number(req.params.id))
    res.json(user)
  } catch (err) {
    next(err)
  }
}
