import 'dotenv/config';

import app from './app.js';
import { connectDB } from './config/db.js';

// 🔎 Verificación clara de envs (temporal)
console.log(
  'OPENAI KEY LOADED:',
  !!process.env.OPENAI_API_KEY
);

connectDB();

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`🚀 Server corriendo en puerto ${PORT}`);
});