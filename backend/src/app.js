import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes.js';
import projectRoutes from '../src/controllers/project.routes.js';
import { connectDB } from './config/db.js';

import resendVerificationRoutes from './routes/resendVerification.routes.js';

import { sendEmail } from '../utils/sendEmail.js';





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

app.get('/api/test-email', async (req, res) => {
  try {
    await sendEmail({
      to: 'info@nidoportal.com',
      subject: 'Test email NIDO',
      html: '<h2>Si ves esto, el mail funciona</h2>',
    });

    res.send('Email enviado correctamente');
  } catch (error) {
    console.error('EMAIL ERROR:', error);
    res.status(500).send('Error enviando email');
  }
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Backend escuchando en puerto ${PORT}`);
});


