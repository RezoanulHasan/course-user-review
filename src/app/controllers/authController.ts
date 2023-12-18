import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from '../modules/user.model';
import config from '../config';

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { username, password } = req.body;

    // Fetch the user from the database based on the provided username
    const user = await UserModel.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      // User is authenticated

      // You can include additional user data in the token payload if needed
      const token = jwt.sign(
        { username: user.username, role: user.role },
        config.SECRET_KEY as string,
      );

      res.json({ token, role: user.role });
    } else {
      // User authentication failed
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    // Pass the error to the error handling middleware
    next(error);
  }
};
