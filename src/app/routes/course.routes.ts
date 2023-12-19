import express from 'express';
import {
  createCourse,
  getCourses,
  updateCourse,
  getCourseById,
  deleteCourse,
} from '../controllers/coursesController';

import {
  authenticateToken,
  isAdmin,
  isUser,
} from '../middlewares/authMiddleware';

const router = express.Router();
// Create courses
router.post('/api/course', authenticateToken, isAdmin, createCourse);
// get all  courses
router.get('/api/courses', authenticateToken, isUser, getCourses);
// get single  courses  by id
router.get('/api/course/:id', authenticateToken, isUser, getCourseById);
// delete  courses  by id
router.delete('/api/course/:id', authenticateToken, isAdmin, deleteCourse);
// update  courses  by id
router.put('/api/course/:courseId', authenticateToken, isAdmin, updateCourse);

export default router;
