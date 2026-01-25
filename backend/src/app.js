import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import authRoutes from './routes/auth.routes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// 🔹 CONEXIÓN A MONGO (ESTO FALTABA)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB conectado'))
  .catch((err) => {
    console.error('Error conectando a MongoDB:', err);
    process.exit(1);
  });

// 🔹 RUTAS
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('NIDO backend running');
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Backend escuchando en puerto ${PORT}`);
});

