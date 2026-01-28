import express from 'express';
import {
  register,
  login,
  verify,
  me
} from '../controllers/auth.controller.js';
import { authRequired } from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/verify', verify);        // ✅ ESTA ES LA CLAVE
router.get('/me', authRequired, me);

export default router;
