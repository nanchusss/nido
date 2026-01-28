import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes.js';
import projectRoutes from '../src/controllers/project.routes.js';


import resendVerificationRoutes from './routes/resendVerification.routes.js';

import { sendEmail } from '../utils/sendEmail.js';





dotenv.config();

const app = express();



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



export default app;