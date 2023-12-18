import express from 'express';
import {
  createReview,
  getCourseWithReviews,
} from '../controllers/review.controller';

const router = express.Router();

//  creating a review
router.post('/api/reviews', createReview);

router.get('/api/courses/:courseId/reviews', getCourseWithReviews);

export default router;
