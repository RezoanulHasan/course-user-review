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

    const user = decodedToken as JwtPayload; // Assuming JwtPayload is the type of your decoded payload

    // Now  access to user data including the role
    req.body.user = user;

    // Check user's role and grant/deny access
    const { role } = user;
    if (role === 'admin') {
      // User is an admin, allow access
      next();
    } else {
      // User is not an admin, deny access
      res
        .status(403)
        .json({ message: 'Access denied. Admin rights required.' });
    }
  });
};
// Middleware to check if the user is an admin
// eslint-disable-next-line @typescript-eslint/ban-types
export const isAdmin = (req: Request, res: Response, next: Function): void => {
  const userRole = req.body.user?.role;
  if (userRole === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Admin rights required.' });
  }
};
