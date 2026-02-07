import express from 'express'
import {
  register,
  login,
  me,
  verifyCode,
} from '../controllers/auth.controller.js'

import { authRequired } from '../../middlewares/auth.middleware.js'

const router = express.Router()

// =====================
// AUTH
// =====================
router.post('/register', register)
router.post('/login', login)
router.get('/me', authRequired, me)

// =====================
// VERIFICACIÓN (ÚNICO FLUJO VÁLIDO)
// =====================
router.post('/verify', verifyCode)

// =====================

export default router