import mongoose, { Schema, Document, Types } from 'mongoose';
import { CourseSchema } from './validationSchemas';

export interface Course extends Document {
  title: string;
  instructor: string;
  categoryId: Types.ObjectId;
  price: number;
  tags: { name: string; isDeleted: boolean }[];
  startDate: string;
  endDate: string;
  language: string;
  provider: string;
  durationInWeeks?: number;
  details: {
    level: string;
    description: string;
  };
}

const courseSchema = new Schema<Course>({
  title: { type: String, unique: true, required: true },
  instructor: { type: String, required: true },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  price: { type: Number, required: true },
  tags: [
    {
      name: { type: String, required: true },
      isDeleted: { type: Boolean, required: true },
    },
  ],
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  language: { type: String, required: true },
  provider: { type: String, required: true },
  durationInWeeks: { type: Number },
  details: {
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'PRO'],
      required: true,
    },
    description: { type: String, required: true },
  },
});

export const CourseModel = mongoose.model<Course>('Course', courseSchema);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateCourse = (data: Record<string, any>) =>
  CourseSchema.parse(data);
