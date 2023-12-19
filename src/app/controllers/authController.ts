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

      // Additional user data to include in the token payload
      const { _id, email, role } = user;

      const token = jwt.sign(
        { _id, username: user.username, email, role },
        config.SECRET_KEY as string,
      );

      res.json({ token, role });
    } else {
      // User authentication failed
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    // Pass the error to the error handling middleware
    next(error);
  }
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { username, password, email, role } = req.body;

    // Check if the username is already taken
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username is already taken' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new UserModel({
      username,
      password: hashedPassword,
      email,
      role: role || 'user', // Set a default role if not provided
    });

    await newUser.save();

    // Generate a token for the newly registered user
    const token = jwt.sign(
      {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
      config.SECRET_KEY as string,
    );

    res.status(201).json({ token, role: newUser.role });
  } catch (error) {
    next(error);
  }
};
