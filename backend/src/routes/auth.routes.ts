import { Router } from 'express'
import {
  register,
  login,
  requestPasswordReset,
  confirmPasswordReset
} from '../controllers/auth.controller.ts'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.post('/password-reset/request', requestPasswordReset)
router.post('/password-reset/confirm', confirmPasswordReset)

export default router
