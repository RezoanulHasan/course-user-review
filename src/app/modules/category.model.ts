import mongoose, { Schema, Document } from 'mongoose';
import { CategorySchema as ValidationCategorySchema } from './validationSchemas';

export interface Category extends Document {
  name: string;
}

const CategorySchema = new Schema<Category>({
  name: { type: String, unique: true, required: true },
});

export const CategoryModel = mongoose.model<Category>(
  'Category',
  CategorySchema,
);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateCategory = (data: Record<string, any>) =>
  ValidationCategorySchema.parse(data);
