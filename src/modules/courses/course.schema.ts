import { z } from 'zod';

export const CreateCourseSchema = z.object({
  title: z.string().min(2),
  teacher: z.string().min(2),
  price: z.number().int().nonnegative().default(0),
  image: z.string().url().optional(),
  tag: z.string().optional()
});

export const UpdateCourseSchema = CreateCourseSchema.partial();

export type CreateCourseInput = z.infer<typeof CreateCourseSchema>;
export type UpdateCourseInput = z.infer<typeof UpdateCourseSchema>;
