import express from 'express';
import {
  createCategory,
  getAllCategories,
} from '../controllers/category.controller';

const router = express.Router();

// Create Category
router.post('/api/categories', createCategory);

// Get All Categories
router.get('/api/categories', getAllCategories);

export default router;
