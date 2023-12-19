import express from 'express';
import {
  createCategory,
  getAllCategories,
} from '../controllers/category.controller';
import {
  authenticateToken,
  isAdmin,
  isUser,
} from '../middlewares/authMiddleware';
const router = express.Router();

// Create Category
router.post('/api/categories', authenticateToken, isAdmin, createCategory);

// Get All Categories
router.get('/api/categories', authenticateToken, isUser, getAllCategories);

export default router;
