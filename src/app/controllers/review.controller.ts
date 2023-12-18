import { Request, Response, NextFunction } from 'express';
import { ReviewModel, validateReview } from '../modules/review.model';
import { CourseModel } from '../modules/course.model';

//..............createReview..................
export const createReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Validate the request body
    const validatedData = validateReview(req.body);

    // Create a new review
    const review = await ReviewModel.create(validatedData);

    // Send a successful response
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Review created successfully',
      data: review,
    });
  } catch (error) {
    // Handle errors
    next(error);
  }
};

//.............getCourseWithReviews..............

export const getCourseWithReviews = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const courseId = req.params.courseId;

    // Retrieve the course by ID
    const course = await CourseModel.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'Course not found',
      });
    }

    // Retrieve reviews associated with the course
    const reviews = await ReviewModel.find({ courseId });

    // Create the response object
    const response = {
      success: true,
      statusCode: 200,
      message: 'Course and Reviews retrieved successfully',
      data: {
        course: course.toObject(),
        reviews: reviews.map((review) => review.toObject()),
      },
    };

    return res.status(200).json(response);
  } catch (error) {
    // Passing errors to the error handler middleware
    next(error);
  }
};
