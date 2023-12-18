import { z } from 'zod';

const detailsSchema = z.object({
  level: z.enum(['Beginner', 'Intermediate', 'Advanced', 'PRO']),
  description: z.string().min(1),
});

export const CourseSchema = z.object({
  title: z.string(),
  instructor: z.string(),
  categoryId: z.string(),
  price: z.number(),
  tags: z.array(
    z.object({
      name: z.string(),
      isDeleted: z.boolean(),
    }),
  ),
  startDate: z.string(),
  endDate: z.string(),
  language: z.string(),
  provider: z.string(),
  durationInWeeks: z.number().optional(),
  details: detailsSchema,
});

export const CategorySchema = z.object({
  name: z.string(),
});

export const ReviewSchema = z.object({
  courseId: z.string(),
  rating: z.number(),
  review: z.string(),
});
