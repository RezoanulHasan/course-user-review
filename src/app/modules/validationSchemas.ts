import { z } from 'zod';

const detailsSchema = z.object({
  level: z.enum(['Beginner', 'Intermediate', 'Advanced', 'PRO']),
  description: z.string().min(1),
});

export const CourseSchema = z.object({
  title: z.string().min(1).max(255),
  instructor: z.string().min(1).max(255),
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
  language: z.string().min(1).max(255),
  provider: z.string().min(1).max(255),
  topics: z.array(z.string().min(1)),
  classDays: z.array(z.string().min(1)),
  classTime: z.string(),

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

export const UserSchema = z.object({
  username: z.string().min(1).max(255),
  password: z.string().min(1),
  email: z.string().min(1),
});
