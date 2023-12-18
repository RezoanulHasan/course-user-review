import mongoose, { Schema, Document } from 'mongoose';
import { UserSchema as ValidationUserSchema } from './validationSchemas';
export interface IUser extends Document {
  username: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },

  password: { type: String, required: true },
});

export const UserModel = mongoose.model<IUser>('User', UserSchema);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateUser = (data: Record<string, any>) =>
  ValidationUserSchema.parse(data);
