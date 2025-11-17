import { prisma } from '../../config/prisma';

export async function enrollCourse(userId: string, courseId: string) {
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: { lessons: true },
  });
  if (!course) throw new Error('Course not found');

  const enrollment = await prisma.enrollment.upsert({
    where: { userId_courseId: { userId, courseId } },
    update: {},
    create: { userId, courseId },
  });

  // tạo LessonProgress cho mỗi bài (nếu chưa có)
  await prisma.$transaction(
    course.lessons.map((l) =>
      prisma.lessonProgress.upsert({
        where: { enrollmentId_lessonId: { enrollmentId: enrollment.id, lessonId: l.id } },
        update: {},
        create: { enrollmentId: enrollment.id, lessonId: l.id },
      })
    )
  );

  return enrollment;
}

export async function listMyEnrollments(userId: string, status?: 'ongoing' | 'completed') {
  const rows = await prisma.enrollment.findMany({
    where: {
      userId,
      ...(status === 'completed' ? { completedAt: { not: null } } :
        status === 'ongoing' ? { completedAt: null } : {}),
    },
    include: {
      course: {
        include: { lessons: true },
      },
    },
    orderBy: { startedAt: 'desc' },
  });

  return rows.map((e) => ({
    id: e.id,
    course: {
      id: e.course.id,
      title: e.course.title,
      image: e.course.image,
      lessonsCount: e.course.lessons.length,
    },
    progressPct: e.progressPct,
    completedAt: e.completedAt,
    startedAt: e.startedAt,
  }));
}
