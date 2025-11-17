// src/modules/enrollments/enrollment.routes.ts
import { Router } from 'express';
import {
  createEnrollmentHandler,
  listMyEnrollmentsHandler,
} from './enrollment.controller.js';
import { requireAuth } from '../../middleware/requireAuth.js';

const router = Router();

// POST /enrollments
router.post('/', requireAuth, (req, res, next) =>
  createEnrollmentHandler(req, res).catch(next)
);

// GET /enrollments/my
router.get('/my', requireAuth, (req, res, next) =>
  listMyEnrollmentsHandler(req, res).catch(next)
);

export default router;
