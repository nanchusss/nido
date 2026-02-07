import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes.js';
import projectRoutes from './routes/project.routes.js';
import resendVerificationRoutes from './routes/resendVerification.routes.js';

import aiRoutes from './routes/ai.js';
import aiImageRoutes from './routes/aiImages.js';

dotenv.config();

const app = express();

/* ✅ MIDDLEWARES PRIMERO */
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

/* ✅ RUTAS DESPUÉS */
app.use('/api/ai', aiRoutes);
app.use('/api/ai-image', aiImageRoutes);

app.use('/api/auth', authRoutes);
app.use('/api/auth', resendVerificationRoutes);
app.use('/api/projects', projectRoutes);

app.get('/', (req, res) => {
  res.send('NIDO backend running');
});

export default app;