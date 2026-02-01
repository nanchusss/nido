import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import authRoutes from './routes/auth.routes.js'
import projectRoutes from './routes/project.routes.js'
import resendVerificationRoutes from './routes/resendVerification.routes.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/auth', resendVerificationRoutes)
app.use('/api/projects', projectRoutes)

app.get('/', (req, res) => {
  res.send('NIDO backend running')
})

export default app
