import express from 'express';
import {
  createCourse,
  getCourses,
  updateCourse,
  getBestCourse,
  getCourseById,
  deleteCourse,
  isAdmin,
} from '../controllers/coursesController';

import { authenticateToken } from '../middlewares/authMiddleware';

const router = express.Router();
// Create courses
router.post('/api/course', authenticateToken, isAdmin, createCourse);
// get all  courses
router.get('/api/courses', getCourses);
// get single  courses  by id
router.get('/api/course/:id', getCourseById);
// delete  courses  by id
router.delete('/api/course/:id', authenticateToken, isAdmin, deleteCourse);
// update  courses  by id
router.put('/api/course/:courseId', authenticateToken, isAdmin, updateCourse);
// get best course
router.get('/api/course/best', authenticateToken, getBestCourse);
export default router;
