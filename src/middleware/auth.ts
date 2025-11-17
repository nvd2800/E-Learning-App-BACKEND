import type { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../utils/jwt.js';

export interface AuthRequest extends Request {
  user?: { sub: string; role: string };
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const payload = verifyJwt(token);
    req.user = payload as any;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

export function requireRole(roles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
}
