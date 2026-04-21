import { Router } from 'express'
import { chat } from '../controllers/ai.controller.js'

const router = Router()

// Allow everyone to use AI chat
router.post('/chat', chat)

export default router
