import mongoose, { Schema, Document, Types } from 'mongoose';
import { ReviewSchema as ValidationReviewSchema } from './validationSchemas';

export interface Review extends Document {
  courseId: Types.ObjectId;
  rating: number;
  review: string;
}

const ReviewSchema = new Schema<Review>({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  rating: { type: Number, required: true, min: 1, max: 5 },
  review: { type: String, required: true },
});

export const ReviewModel = mongoose.model<Review>('Review', ReviewSchema);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateReview = (data: Record<string, any>) =>
  ValidationReviewSchema.parse(data);
