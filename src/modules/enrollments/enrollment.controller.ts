// src/modules/enrollments/enrollment.controller.ts
import type { Request, Response } from 'express';
import { prisma } from '../../config/prisma.js';
import { AppError } from '../../utils/appError.js';

// POST /enrollments  { courseId }
export async function createEnrollmentHandler(req: Request, res: Response) {
  const userId = req.userId;
  const { courseId } = req.body;

  if (!userId) throw new AppError(401, 'Unauthenticated');
  if (!courseId) throw new AppError(400, 'courseId is required');

  const course = await prisma.course.findUnique({ where: { id: courseId } });
  if (!course) throw new AppError(404, 'Course not found');

  const enrollment = await prisma.enrollment.upsert({
  where: { userId_courseId: { userId, courseId } }, // ✅ không còn gạch đỏ
  update: {},
  create: { userId, courseId },
});

  return res.status(201).json(enrollment);
}

// GET /enrollments/my
export async function listMyEnrollmentsHandler(req: Request, res: Response) {
  const userId = req.userId;
  if (!userId) throw new AppError(401, 'Unauthenticated');

  const list = await prisma.enrollment.findMany({
    where: { userId },
    include: { course: true },
    orderBy: { createdAt: 'desc' },
  });

  return res.json(list);
}
