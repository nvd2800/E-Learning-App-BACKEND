// src/modules/courses/course.routes.ts
import { Router } from 'express';
import {
  listCoursesHandler,
  getCourseDetailHandler,
} from './course.controller.js';

const router = Router();

// GET /api/courses
// GET /api/courses?search=react
router.get('/', (req, res, next) =>
  listCoursesHandler(req, res).catch(next)
);

// GET /api/courses/:id
router.get('/:id', (req, res, next) =>
  getCourseDetailHandler(req, res).catch(next)
);

export default router;
