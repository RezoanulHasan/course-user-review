/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import notFound from './app/middlewares/notFound';
import errorHandler from './app/middlewares/errorHandler';
import courseRoutes from './app/routes/course.routes';
import categoryRoutes from './app/routes/category.routes';
import reviewRoutes from './app/routes/review.routes';
import authRoutes from './app/routes/authRoutes';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

app.use(courseRoutes);
app.use(categoryRoutes);
app.use(reviewRoutes);

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'sever is running' });
});

// Apply authentication routes
app.use('/api/auth', authRoutes);

// Golobal error handler

app.use(errorHandler);

//Not Found handler
app.use(notFound);

export default app;
