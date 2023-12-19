import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.header('Authorization');

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Access denied. Token is missing.' });
  }

  jwt.verify(token, config.SECRET_KEY as string, (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token.' });
    }

    const user = decodedToken as JwtPayload;

    // Now access to user data including the role
    req.body.user = user;

    // Continue with the next middleware
    next();
  });
};

// Middleware to check if the user is an admin
export const isAdmin = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const userRole = req.body.user?.role;

  if (userRole === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Admin rights required.' });
  }
};

// Middleware to check if the user is a regular user (non-admin)
export const isUser = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const userRole = req.body.user?.role;

  if (userRole && userRole !== 'admin') {
    next();
  } else {
    res
      .status(403)
      .json({ message: 'Access denied. Regular user rights required.' });
  }
};
