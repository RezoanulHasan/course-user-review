/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request, Response, NextFunction } from 'express';
import { CourseModel, validateCourse } from '../modules/course.model';
import {
  buildFilter,
  extractSortingParams,
  extractPaginationParams,
} from './helpers';

//............create-courses........................

export const createCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedData = validateCourse(req.body);

    // Explicitly type startDate and endDate as Date
    const startDate: Date = new Date(validatedData.startDate);
    const endDate: Date = new Date(validatedData.endDate);

    const durationInWeeks = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000),
    );

    const courseData = {
      ...validatedData,
      durationInWeeks,
    };

    const course = await CourseModel.create(courseData);

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Course created successfully',
      data: course,
    });
  } catch (error) {
    next(error);
  }
};

//..................get-courses................

export const getCourses = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      page = '1',
      limit = '10',
      sortBy,
      sortOrder = 'asc',
      minPrice,
      maxPrice,
      tags,
      startDate,
      endDate,
      language,
      provider,
      durationInWeeks,
      level,
    } = req.query;

    const { parsedPage, parsedLimit } = extractPaginationParams(page, limit);

    const filter = buildFilter(
      minPrice,
      maxPrice,
      tags,
      startDate as any,
      endDate as any,
      language as any,
      provider as any,
      durationInWeeks as any,
      level as any,
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sort = extractSortingParams(sortBy as any, sortOrder as any);

    const courses = await CourseModel.find(filter)
      .sort(sort)
      .skip((parsedPage - 1) * parsedLimit)
      .limit(parsedLimit)
      .exec();

    const total = await CourseModel.countDocuments(filter);

    const response = {
      success: true,
      statusCode: 200,
      message: 'Courses retrieved successfully',
      meta: {
        page: parsedPage,
        limit: parsedLimit,
        total,
      },
      data: courses,
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

// ..............updateCourse.................
// Import necessary modules and models

export const updateCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const courseId = req.params.courseId;

  try {
    // Fetch the existing course
    const existingCourse = await CourseModel.findById(courseId);

    if (!existingCourse) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'Course not found',
      });
    }

    // Update primitive fields
    if (req.body.price) {
      existingCourse.price = req.body.price;
    }

    // Update non-primitive fields
    if (req.body.details && req.body.details.level) {
      existingCourse.details.level = req.body.details.level;
    }

    // Update tags
    if (req.body.tags && req.body.tags.length > 0) {
      req.body.tags.forEach((tag: any) => {
        const existingTagIndex = existingCourse.tags.findIndex(
          (t: { name: any }) => t.name === tag.name,
        );

        if (tag.isDeleted) {
          // Delete the tag if isDeleted is true
          if (existingTagIndex !== -1) {
            existingCourse.tags.splice(existingTagIndex, 1);
          }
        } else {
          // Update or add a new tag
          if (existingTagIndex !== -1) {
            // Update isDeleted for an existing tag
            existingCourse.tags[existingTagIndex].isDeleted = tag.isDeleted;
          } else {
            // Add a new tag
            existingCourse.tags.push({
              name: tag.name,
              isDeleted: tag.isDeleted,
            });
          }
        }
      });
    }

    // Save the updated course
    const updatedCourse = await existingCourse.save();

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Course updated successfully',
      data: updatedCourse,
    });
  } catch (error) {
    // Pass any errors to the error handler middleware
    next(error);
  }
};

//-----------------getBestCourse........................

export const getBestCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Retrieve courses with their average ratings and review counts
    const coursesWithStats = await CourseModel.aggregate([
      {
        $lookup: {
          from: 'reviews', // Assuming the collection name for reviews is 'reviews'
          localField: '_id',
          foreignField: 'courseId',
          as: 'reviews',
        },
      },
      {
        $addFields: {
          averageRating: { $avg: '$reviews.rating' },
          reviewCount: { $size: '$reviews' },
        },
      },
      {
        $sort: {
          averageRating: -1, // Sort in descending order by average rating
        },
      },
      {
        $limit: 1, // Get the top course
      },
    ]);

    if (coursesWithStats.length === 0) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'No courses found',
      });
    }

    const bestCourse = coursesWithStats[0];

    // Create the response object
    const response = {
      success: true,
      statusCode: 200,
      message: 'Best course retrieved successfully',
      data: {
        course: {
          _id: bestCourse._id,
          title: bestCourse.title,
          instructor: bestCourse.instructor,
          categoryId: bestCourse.categoryId,
          price: bestCourse.price,
          tags: bestCourse.tags,
          startDate: bestCourse.startDate,
          endDate: bestCourse.endDate,
          language: bestCourse.language,
          provider: bestCourse.provider,
          durationInWeeks: bestCourse.durationInWeeks,
          details: bestCourse.details,
        },
        averageRating: bestCourse.averageRating,
        reviewCount: bestCourse.reviewCount,
      },
    };

    return res.status(200).json(response);
  } catch (error) {
    // Pass any errors to the error handler middleware
    next(error);
  }
};
