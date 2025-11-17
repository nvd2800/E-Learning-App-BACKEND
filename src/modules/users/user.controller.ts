import type { Response, NextFunction } from 'express';
import { AuthRequest } from '../../middleware/auth.js';
import * as Svc from './user.service.js';

export async function getMe(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const user = await Svc.me(req.user!.sub);
    res.json({ user });
  } catch (e) { next(e); }
}
