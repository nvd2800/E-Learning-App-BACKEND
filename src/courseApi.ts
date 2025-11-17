// src/services/courseApi.ts
import { api } from "./api";

// KHỚP với backend prisma Course
export type Course = {
  id: string;
  title: string;
  teacher: string;
  price: number;
  rating: number;
  image?: string | null;
};

export type LessonFromApi = {
  id: string;
  title: string;
  duration: number | null; // giây
  order: number;
  videoUrl?: string | null;
};

export const courseApi = {
  async list(): Promise<Course[]> {
    const res = await api.get("/api/courses");
    return res.data as Course[];
  },

  async getById(id: string): Promise<Course> {
    const res = await api.get(`/api/courses/${id}`);
    return res.data as Course;
  },

  async getLessons(id: string): Promise<LessonFromApi[]> {
    const res = await api.get(`/api/lessons/by-course/${id}`);
    return res.data as LessonFromApi[];
  },
};
