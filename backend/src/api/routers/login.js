import express from 'express'
import { login } from '../controllers/login.js'

const router = express.Router()
router.route('/api/auth/login').post(login)

export default router
