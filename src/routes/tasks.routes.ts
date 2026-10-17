import { Router } from 'express'
import * as tasksController from '../controllers/tasks.controller'

const router = Router()

router.post('/bulk', tasksController.createBulkTasks)
router.get('/overdue', tasksController.getOverdueTasks)
router.post('/', tasksController.createTask)
router.get('/', tasksController.listTasks)
router.get('/:id', tasksController.getTask)
router.patch('/:id', tasksController.updateTask)
router.post('/:id/complete', tasksController.completeTask)
router.delete('/:id', tasksController.removeTask)

export default router
