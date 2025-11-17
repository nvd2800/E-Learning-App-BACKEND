// src/modules/courses/course.service.ts
import { prisma } from "../../config/prisma.js";

export async function listCourses() {
  // Lấy danh sách khóa học + số bài học
  const courses = await prisma.course.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { lessons: true } },
    },
  });

  return courses.map((c: { id: any; title: any; description: any; image: any; price: any; _count: { lessons: any; }; }) => ({
    id: c.id,
    title: c.title,
    description: c.description,
    image: c.image,
    price: c.price,
    lessonCount: c._count.lessons,
  }));
}

/**
 * Tính tiến độ của 1 khóa học cho 1 user
 */
export async function getCourseProgress(userId: string, courseId: string) {
  const totalLessons = await prisma.lesson.count({
    where: { courseId },
  });

  // Số bài đã hoàn thành của user trong course này
  const completedLessons = await prisma.lessonProgress.count({
    where: {
      userId,
      completed: true,
      lesson: { courseId },
    },
  });

  const percent =
    totalLessons === 0 ? 0 : Math.round((completedLessons * 100) / totalLessons);

  return {
    courseId,
    totalLessons,
    completedLessons,
    percent,
    isCompleted: totalLessons > 0 && completedLessons === totalLessons,
  };
}
