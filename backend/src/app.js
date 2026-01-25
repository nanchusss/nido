import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes.js';
import projectRoutes from '../src/controllers/project.routes.js';
import { connectDB } from './config/db.js';

import resendVerificationRoutes from './routes/resendVerification.routes.js';




dotenv.config();

const app = express();

// 🔌 CONECTAR MONGO ANTES DE USAR RUTAS
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', resendVerificationRoutes);

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);

app.get('/', (req, res) => {
  res.send('NIDO backend running');
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Backend escuchando en puerto ${PORT}`);
});


