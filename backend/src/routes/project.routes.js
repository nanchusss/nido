import { Router } from 'express';
import { authRequired } from '../../middlewares/auth.middleware.js';
import {
  createProject,
  getMyProjects,
} from '../controllers/project.controller.js';

const router = Router();

router.post('/', authRequired, createProject);
router.get('/', authRequired, getMyProjects);

export default router;
