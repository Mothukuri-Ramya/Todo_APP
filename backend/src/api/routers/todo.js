import express from 'express'
import { isAuth } from '../../utils/auth.js'
import {
  getTodos,
  updateTodo,
  deleteTodo,
  createTodo,
  getTodo,
} from '../controllers/todos.js'

const router = express.Router()

router.route('/api/todos').get(isAuth, getTodos).post(isAuth, createTodo)
router
  .route('/api/todos/:id')
  .put(isAuth, updateTodo)
  .delete(isAuth, deleteTodo)
  .get(isAuth, getTodo)

export default router
