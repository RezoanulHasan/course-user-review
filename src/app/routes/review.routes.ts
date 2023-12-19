import express from 'express';
import {
  createReview,
  getCourseWithReviews,
} from '../controllers/review.controller';

import { authenticateToken, isUser } from '../middlewares/authMiddleware';

const router = express.Router();

//  creating a review
router.post('/api/reviews', authenticateToken, isUser, createReview);

router.get(
  '/api/courses/:courseId/reviews',

  authenticateToken,
  isUser,
  getCourseWithReviews,
);

export default router;
