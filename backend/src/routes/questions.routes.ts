import { Router } from 'express'
import { getCategories, getQuestionsByCategory } from '../controllers/questions.controller.ts'
import { authenticate } from '../middleware/auth.middleware.ts'

const router = Router()

// Protect all questions routes with authenticate middleware
router.use(authenticate)

router.get('/categories', getCategories)
router.get('/categories/:categoryId/questions', getQuestionsByCategory)

export default router
