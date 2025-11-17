// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Xoá sạch (cho dễ test)
  await prisma.lessonProgress.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.course.deleteMany();
  await prisma.user.deleteMany();

  // User demo
  const user = await prisma.user.create({
    data: {
      id: "u1",
      name: "Demo Student",
      email: "student@example.com",
      passwordHash:
        "$2b$10$9bqbS8h4U6Kq1b5E2o7Rcu4v1y2tY0p3X4M0C8dRjDWZ3FJ6b7b.", // bcrypt dummy
    },
  });

  // ===== Course 1 (id c1) =====
  const c1 = await prisma.course.create({
    data: {
      id: "c1",
      title: "Website Design",
      description: "Thiết kế website hiện đại với HTML/CSS và Figma.",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop",
      price: 59,
    },
  });

  await prisma.lesson.createMany({
    data: [
      {
        id: "c1_l1",
        title: "Giới thiệu khóa học & UX/UI",
        videoUrl:
          "https://youtu.be/Tlbp4PZck-g?si=demo01", // thay bằng video thật của bạn
        duration: 600,
        order: 1,
        courseId: c1.id,
      },
      {
        id: "c1_l2",
        title: "Cài đặt môi trường (VSCode, Node, Figma)",
        videoUrl:
          "https://youtu.be/Ke90Tje7VS0?si=demo02",
        duration: 900,
        order: 2,
        courseId: c1.id,
      },
      {
        id: "c1_l3",
        title: "Xây dựng layout đầu tiên",
        videoUrl:
          "https://youtu.be/wIx1O5Y5EB4?si=demo03",
        duration: 1200,
        order: 3,
        courseId: c1.id,
      },
    ],
  });

  // ===== Course 2 (id c2) =====
  const c2 = await prisma.course.create({
    data: {
      id: "c2",
      title: "React Native Fundamentals",
      description: "Nền tảng React Native cho mobile app.",
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop",
      price: 79,
    },
  });

  await prisma.lesson.createMany({
    data: [
      {
        id: "c2_l1",
        title: "Giới thiệu React Native",
        videoUrl:
          "https://videos.example.com/react-native/intro.mp4",
        duration: 600,
        order: 1,
        courseId: c2.id,
      },
      {
        id: "c2_l2",
        title: "Cài đặt môi trường Expo",
        videoUrl:
          "https://videos.example.com/react-native/env-setup.mp4",
        duration: 900,
        order: 2,
        courseId: c2.id,
      },
    ],
  });

  // ===== Course 3 (id c3) =====
  const c3 = await prisma.course.create({
    data: {
      id: "c3",
      title: "UX Research for Beginners",
      description: "Các bước nghiên cứu người dùng cơ bản.",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
      price: 39,
    },
  });

  await prisma.lesson.createMany({
    data: [
      {
        id: "c3_l1",
        title: "Tổng quan UX Research",
        videoUrl:
          "https://videos.example.com/ux/overview.mp4",
        duration: 700,
        order: 1,
        courseId: c3.id,
      },
      {
        id: "c3_l2",
        title: "Phỏng vấn người dùng",
        videoUrl:
          "https://videos.example.com/ux/interview.mp4",
        duration: 800,
        order: 2,
        courseId: c3.id,
      },
    ],
  });

  console.log("✅ Seed xong user + 3 courses + lessons");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
