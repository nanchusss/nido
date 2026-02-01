import express from 'express'
import {
  register,
  login,
  me,
  verify
} from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/me', me)
router.get('/verify/:token', verify)

export default router
