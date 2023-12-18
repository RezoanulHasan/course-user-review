import express from 'express';
import {
  createCourse,
  getCourses,
  updateCourse,
  getBestCourse,
  getCourseById,
  deleteCourse,
} from '../controllers/coursesController';

const router = express.Router();
// Create courses
router.post('/api/course', createCourse);
// get all  courses
router.get('/api/courses', getCourses);
// get single  courses  by id
router.get('/api/course/:id', getCourseById);
// delete  courses  by id
router.delete('/api/course/:id', deleteCourse);
// update  courses  by id
router.put('/api/course/:courseId', updateCourse);
// get best course
router.get('/api/course/best', getBestCourse);
export default router;
