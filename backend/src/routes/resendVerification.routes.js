import express from 'express';
import { resendVerification } from '../controllers/resendVerification.controller.js';

const router = express.Router();

router.post('/resend-verification', resendVerification);

export default router;
