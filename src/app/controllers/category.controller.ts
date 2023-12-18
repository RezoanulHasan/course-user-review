import { Request, Response, NextFunction } from 'express';
import { CategoryModel, validateCategory } from '../modules/category.model';

// .............Create Category Controller...................
export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Validate request body
    const validatedData = validateCategory(req.body);

    // Create a new category
    const category = await CategoryModel.create(validatedData);

    // Send success response
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Category created successfully',
      data: {
        _id: category._id,
        name: category.name,
      },
    });
  } catch (error) {
    // Pass the error to the error handling middleware
    next(error);
  }
};
//.....................getAllCategories.....................
export const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Retrieve all categories
    const categories = await CategoryModel.find();

    // Send success response with the list of categories
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Categories retrieved successfully',
      data: categories.map((category) => ({
        _id: category._id,
        name: category.name,
      })),
    });
  } catch (error) {
    // Pass the error to the error handling middleware
    next(error);
  }
};
