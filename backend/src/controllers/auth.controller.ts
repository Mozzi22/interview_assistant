import type { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'
import { generateToken } from '../utils/jwt.ts'
import { Resend } from 'resend'

const prisma = new PrismaClient()
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' })
      return
    }

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      res.status(400).json({ error: 'User already exists' })
      return
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash
      }
    })

    const token = generateToken(user.id)
    res.status(201).json({ data: { token, user: { id: user.id, email: user.email } } })
  } catch (error) {
    console.error('Registration Error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' })
      return
    }

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' })
      return
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash)
    if (!isValidPassword) {
      res.status(401).json({ error: 'Invalid credentials' })
      return
    }

    const token = generateToken(user.id)
    res.json({ data: { token, user: { id: user.id, email: user.email } } })
  } catch (error) {
    console.error('Login Error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const requestPasswordReset = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      // Don't leak whether user exists, just return success
      res.json({ data: { message: 'If an account exists, a reset code was sent.' } })
      return
    }

    const resetCode = Math.floor(100000 + Math.random() * 900000).toString() // 6 digit code
    const resetCodeExpires = new Date(Date.now() + 15 * 60 * 1000) // 15 mins

    await prisma.user.update({
      where: { id: user.id },
      data: { resetCode, resetCodeExpires }
    })

    // Send email with reset code using Resend, if configured
    if (resend) {
      await resend.emails.send({
        from: 'Interview Assistant <onboarding@resend.dev>',
        to: [email],
        subject: 'Password Reset Code',
        html: `<p>Your password reset code is: <strong>${resetCode}</strong></p><p>It covers within 15 minutes.</p>`
      })
    } else {
        console.warn('RESEND_API_KEY is not configured! Simulated code:', resetCode);
    }

    res.json({  data: { message: 'If an account exists, a reset code was sent.' } })
  } catch (error) {
    console.error('Reset Request Error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const confirmPasswordReset = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, code, password } = req.body
    
    if (!email) {
      res.status(400).json({ error: 'email Missing required fields' })
      return
    }
    if (!code) {
      res.status(400).json({ error: 'code Missing required fields' })
      return
    }
    if (!password) {
      res.status(400).json({ error: 'password Missing required fields' })
      return
    }

    const user = await prisma.user.findUnique({ where: { email } })
    
    if (!user || user.resetCode !== code || !user.resetCodeExpires || user.resetCodeExpires < new Date()) {
      res.status(400).json({ error: 'Invalid or expired reset code' })
      return
    }

    const passwordHash = await bcrypt.hash(password, 10)
    
    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash,
        resetCode: null,
        resetCodeExpires: null
      }
    })

    res.json({ data: { message: 'Password reset successful!' } })
  } catch (error) {
    console.error('Reset Confirm Error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
