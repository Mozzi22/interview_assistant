import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export interface AuthenticatedRequest extends Request {
  user?: { id: string }
}

export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader?.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Unauthorized: Missing token' })
      return
    }

    const token = authHeader.split(' ')[1]
    if (!token) {
      res.status(401).json({ error: 'Unauthorized: Missing token segment' })
      return
    }
    const secret = (process.env.JWT_SECRET as string) || 'fallback_secret_key'

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const decoded = jwt.verify(token, secret) as any
    req.user = { id: decoded.userId }
    next()
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized: Invalid token' })
  }
}
