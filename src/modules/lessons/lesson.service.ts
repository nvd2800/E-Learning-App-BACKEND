// src/modules/lessons/lesson.service.ts
import { prisma } from "../../config/db";

/**
 * Lấy danh sách bài học của 1 khoá (sắp theo order tăng dần)
 */
export async function listLessonsByCourse(courseId: string) {
  return prisma.lesson.findMany({
    where: { courseId },
    orderBy: { order: "asc" },
  });
}

/**
 * Lấy chi tiết bài học + trạng thái đã hoàn thành hay chưa
 * (nếu userId không có thì chỉ trả thông tin bài học)
 */
export async function getLessonWithProgress(lessonId: string, userId?: string) {
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
  });

  if (!lesson) return null;

  if (!userId) {
    return { ...lesson, completed: false };
  }

  const progress = await prisma.lessonProgress.findFirst({
    where: { userId, lessonId },
  });

  return {
    ...lesson,
    completed: !!progress?.completed,
  };
}

/**
 * Đánh dấu 1 bài học là hoàn thành cho user
 */
export async function completeLesson(userId: string, lessonId: string) {
  const existing = await prisma.lessonProgress.findFirst({
    where: { userId, lessonId },
  });

  if (!existing) {
    return prisma.lessonProgress.create({
      data: { userId, lessonId, completed: true },
    });
  }

  return prisma.lessonProgress.update({
    where: { id: existing.id },
    data: { completed: true },
  });
}

/**
 * Tính % hoàn thành của 1 khoá học cho user
 */
export async function getCourseProgress(
  userId: string,
  courseId: string
): Promise<{ total: number; completed: number; percent: number }> {
  const total = await prisma.lesson.count({
    where: { courseId },
  });

  if (total === 0) {
    return { total: 0, completed: 0, percent: 0 };
  }

  const completed = await prisma.lessonProgress.count({
    where: {
      userId,
      completed: true,
      lesson: { courseId },
    },
  });

  const percent = Math.round((completed / total) * 100);

  return { total, completed, percent };
}
