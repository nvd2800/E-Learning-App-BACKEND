// src/modules/courses/course.controller.ts
import type { Request, Response } from 'express';
import { prisma } from '../../config/prisma.js';

// Lấy danh sách khoá học + hỗ trợ search theo tên
// GET /api/courses
// GET /api/courses?search=react
export async function listCoursesHandler(req: Request, res: Response) {
  const raw = (req.query.search as string | undefined) ?? '';
  const search = raw.trim().toLowerCase(); // chuyển về chữ thường

  // Lấy tất cả khoá học từ DB
  const courses = await prisma.course.findMany({
    orderBy: { createdAt: 'desc' },
  });

  // Nếu không có search -> trả luôn
  if (!search) {
    return res.json(courses);
  }

  // Nếu có search -> lọc theo title (không phân biệt hoa/thường)
  const filtered = courses.filter((c) =>
    c.title.toLowerCase().includes(search)
  );

  return res.json(filtered);
}

// Lấy chi tiết khoá học + lessons
// GET /api/courses/:id
export async function getCourseDetailHandler(req: Request, res: Response) {
  const { id } = req.params;

  const course = await prisma.course.findUnique({
    where: { id },
    include: { lessons: { orderBy: { order: 'asc' } } },
  });

  if (!course) {
    return res.status(404).json({ message: 'Course not found' });
  }

  return res.json(course);
}
