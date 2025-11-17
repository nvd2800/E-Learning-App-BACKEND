// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // ============================================================
  // 1. USER DEMO
  // ============================================================
  const demoUser = await prisma.user.upsert({
    where: { email: 'student@example.com' }, // email là @unique -> OK
    update: {},
    create: {
      name: 'Demo Student',
      email: 'student@example.com',
      passwordHash:
        '$2b$10$9bqbS8h4U6Kq1b5E2o7Rcu4v1y2tY0p3X4M0C8dRjDWZ3FJ6b7b.', // ví dụ
    },
  });

  console.log('✅ Đã seed demo user:', demoUser.email);

  // ============================================================
  // 2. DỌN DỮ LIỆU CŨ (LESSON + LESSONPROGRESS)
  //    (xóa con trước, tránh lỗi khóa ngoại P2003)
  // ============================================================
  console.log('🧹 Đang xóa LessonProgress & Lesson cũ...');
  await prisma.lessonProgress.deleteMany(); // bảng con
  await prisma.lesson.deleteMany();         // bảng cha của LessonProgress
  console.log('✅ Đã xóa dữ liệu bài học cũ');

  // ============================================================
  // 3. COURSE 1 — React Native Fundamentals
  // ============================================================
  const course1 = await prisma.course.upsert({
    where: { id: 'demo-course-1' }, // dùng field unique: id
    update: {},
    create: {
      id: 'demo-course-1',
      title: 'React Native Fundamentals',
      description: 'Khoá học cơ bản về React Native cho người mới bắt đầu.',
      image:
        'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
      price: 59,
    },
  });

  await prisma.lesson.createMany({
    data: [
      {
        title: 'Giới thiệu React Native',
        videoUrl:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        duration: 600,
        order: 1,
        courseId: course1.id,
      },
      {
        title: 'Cài đặt môi trường',
        videoUrl:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        duration: 900,
        order: 2,
        courseId: course1.id,
      },
      {
        title: 'Xây màn hình đầu tiên',
        videoUrl:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
        duration: 1200,
        order: 3,
        courseId: course1.id,
      },
    ],
  });

  console.log('✅ Đã seed course 1:', course1.title);

  // ============================================================
  // 4. COURSE 2 — Node.js API Mastery
  // ============================================================
  const course2 = await prisma.course.upsert({
    where: { id: 'demo-course-2' },
    update: {},
    create: {
      id: 'demo-course-2',
      title: 'Node.js API Mastery',
      description: 'Học cách xây dựng REST API với Express, Prisma và JWT.',
      image:
        'https://images.unsplash.com/photo-1559526324-593bc073d938?w=800',
      price: 79,
    },
  });

  await prisma.lesson.createMany({
    data: [
      {
        title: 'Giới thiệu Node.js & Express',
        videoUrl:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        duration: 700,
        order: 1,
        courseId: course2.id,
      },
      {
        title: 'Xây API CRUD đầu tiên',
        videoUrl:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        duration: 1100,
        order: 2,
        courseId: course2.id,
      },
      {
        title: 'Authentication với JWT',
        videoUrl:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
        duration: 900,
        order: 3,
        courseId: course2.id,
      },
    ],
  });

  console.log('✅ Đã seed course 2:', course2.title);

  // ============================================================
  // 5. COURSE 3 — Fullstack MongoDB + React
  // ============================================================
  const course3 = await prisma.course.upsert({
    where: { id: 'demo-course-3' },
    update: {},
    create: {
      id: 'demo-course-3',
      title: 'Fullstack MongoDB + React',
      description:
        'Dựng ứng dụng MERN hoàn chỉnh: backend Mongo + frontend React.',
      image:
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
      price: 89,
    },
  });

  await prisma.lesson.createMany({
    data: [
      {
        title: 'Cài đặt dự án MERN',
        videoUrl:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        duration: 850,
        order: 1,
        courseId: course3.id,
      },
      {
        title: 'Xây dựng model & API MongoDB',
        videoUrl:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
        duration: 1200,
        order: 2,
        courseId: course3.id,
      },
      {
        title: 'Xây UI React và kết nối API',
        videoUrl:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
        duration: 1100,
        order: 3,
        courseId: course3.id,
      },
    ],
  });

  console.log('✅ Đã seed course 3:', course3.title);

  // ============================================================
  // 6. COURSE 4 — Python for AI & Machine Learning
  // ============================================================
  const course4 = await prisma.course.upsert({
    where: { id: 'demo-course-4' },
    update: {},
    create: {
      id: 'demo-course-4',
      title: 'Python for AI & Machine Learning',
      description:
        'Khóa học nền tảng AI/ML: NumPy, Pandas, Matplotlib, Scikit-learn.',
      image:
        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800',
      price: 99,
    },
  });

  await prisma.lesson.createMany({
    data: [
      {
        title: 'Python nền tảng cho AI',
        videoUrl:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        duration: 940,
        order: 1,
        courseId: course4.id,
      },
      {
        title: 'Xử lý dữ liệu với Pandas',
        videoUrl:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
        duration: 1300,
        order: 2,
        courseId: course4.id,
      },
      {
        title: 'Machine Learning với Scikit-Learn',
        videoUrl:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
        duration: 1500,
        order: 3,
        courseId: course4.id,
      },
    ],
  });

  console.log('✅ Đã seed course 4:', course4.title);

  console.log('🎉 Seed xong demo user + 4 khoá học + lessons');
}

main()
  .catch((e) => {
    console.error('❌ Lỗi khi seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
