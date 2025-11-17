import { Router } from 'express';
import { requireAuth } from '../../middleware/auth.js';
import * as Ctrl from './user.controller.js';

const r = Router();

r.get('/me', requireAuth, Ctrl.getMe);

export default r;
