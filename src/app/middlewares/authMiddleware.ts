import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): void | Response<any, Record<string, any>> => {
  const token = req.header('Authorization');
  if (!token)
    return res
      .status(401)
      .json({ message: 'Access denied. Token is missing.' });

  jwt.verify(token, process.env.SECRET_KEY as string, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token.' });
    req.body.user = user;
    next();
  });
};
