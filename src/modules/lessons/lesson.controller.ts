import { Request, Response } from "express";
import { prisma } from "../../config/db";
import { AppError } from "../../utils/appError";

// GET /api/lessons/by-course/:courseId
// -> trả về danh sách bài học của khóa, kèm completed cho user hiện tại
export async function getLessonsByCourseHandler(req: Request, res: Response) {
  const { courseId } = req.params;
  const userId = (req as any).userId as string | undefined; // đã gán trong requireAuth

  if (!courseId) {
    throw new AppError(400, "courseId is required");
  }

  const lessons = await prisma.lesson.findMany({
    where: { courseId },
    orderBy: { order: "asc" },
    include: { progresses: true },
  });

  const mapped = lessons.map((ls) => {
    const myProgress = userId
      ? ls.progresses.find((p) => p.userId === userId)
      : undefined;

    return {
      id: ls.id,
      title: ls.title,
      duration: ls.duration ?? 0,
      videoUrl: ls.videoUrl,
      order: ls.order,
      completed: myProgress?.completed ?? false,
    };
  });

  return res.json(mapped);
}

// POST /api/lessons/:lessonId/complete
// body: { completed: boolean } (mặc định true)
export async function setLessonCompleteHandler(req: Request, res: Response) {
  const { lessonId } = req.params;
  const userId = (req as any).userId as string | undefined;
  const { completed = true } = req.body as { completed?: boolean };

  if (!userId) throw new AppError(401, "Unauthenticated");
  if (!lessonId) throw new AppError(400, "lessonId is required");

  // kiểm tra lesson có tồn tại
  const lesson = await prisma.lesson.findUnique({ where: { id: lessonId } });
  if (!lesson) throw new AppError(404, "Lesson not found");

  const progress = await prisma.lessonProgress.upsert({
    where: {
      // cần unique composite trong schema: @@unique([userId, lessonId])
      userId_lessonId: { userId, lessonId },
    },
    update: { completed },
    create: { userId, lessonId, completed },
  });

  return res.status(200).json({ success: true, progress });
}

// GET /api/courses/:courseId/progress
// -> tổng số bài, số đã hoàn thành, % và completed?
export async function getCourseProgressHandler(req: Request, res: Response) {
  const { courseId } = req.params;
  const userId = (req as any).userId as string | undefined;

  if (!userId) throw new AppError(401, "Unauthenticated");
  if (!courseId) throw new AppError(400, "courseId is required");

  const totalLessons = await prisma.lesson.count({
    where: { courseId },
  });

  if (totalLessons === 0) {
    return res.json({
      totalLessons: 0,
      completedLessons: 0,
      percent: 0,
      completed: false,
    });
  }

  const completedLessons = await prisma.lessonProgress.count({
    where: {
      userId,
      completed: true,
      lesson: { courseId },
    },
  });

  const percent = Math.round((completedLessons / totalLessons) * 100);

  return res.json({
    totalLessons,
    completedLessons,
    percent,
    completed: percent >= 100,
  });
}
