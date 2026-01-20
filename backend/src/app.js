import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('NIDO backend running');
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Backend escuchando en puerto ${PORT}`);
});
