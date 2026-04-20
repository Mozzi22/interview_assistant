import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = process.env.PORT || 4000

app.use(
  cors({
    origin: ['http://localhost:3001', process.env.FRONTEND_URL || ''].filter(Boolean),
    credentials: true
  })
)

app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' })
})

import authRoutes from './routes/auth.routes.ts'
import questionsRoutes from './routes/questions.routes.ts'
import aiRoutes from './routes/ai.routes.ts'

app.use('/api/auth', authRoutes)
app.use('/api/questions', questionsRoutes)
app.use('/api/ai', aiRoutes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
