import type { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { order: 'asc' }
    })
    res.json({ data: categories })
  } catch (error) {
    console.error('Error fetching categories:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const getQuestionsByCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const categoryId = req.params.categoryId as string
    const questions = await prisma.question.findMany({
      where: { category_id: categoryId },
      orderBy: { order: 'asc' }
    })
    res.json({ data: questions })
  } catch (error) {
    console.error('Error fetching questions:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
