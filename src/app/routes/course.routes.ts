import express from 'express';
import {
  createCourse,
  getCourses,
  updateCourse,
  getBestCourse,
} from '../controllers/coursesController';

const router = express.Router();
// Create courses
router.post('/api/course', createCourse);
// get all  courses
router.get('/api/courses', getCourses);

router.put('/api/courses/:courseId', updateCourse);
// get best course
router.get('/api/course/best', getBestCourse);
export default router;
