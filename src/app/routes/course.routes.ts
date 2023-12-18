import express from 'express';
import {
  createCourse,
  getCourses,
  updateCourse,
  getBestCourse,
  getCourseById,
  deleteCourse,
} from '../controllers/coursesController';

import { authenticateToken } from '../middlewares/authMiddleware';

const router = express.Router();
// Create courses
router.post('/api/course', authenticateToken, createCourse);
// get all  courses
router.get('/api/courses', authenticateToken, getCourses);
// get single  courses  by id
router.get('/api/course/:id', authenticateToken, getCourseById);
// delete  courses  by id
router.delete('/api/course/:id', authenticateToken, deleteCourse);
// update  courses  by id
router.put('/api/course/:courseId', authenticateToken, updateCourse);
// get best course
router.get('/api/course/best', getBestCourse);
export default router;
