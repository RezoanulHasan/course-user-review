# Project-name:  Course Review

## Project-type: DataBase and API Design follow Module Pattern
## Live link:  https://course-review-nine.vercel.app/

## Technology use 
- Node js
- Express js
- Mongoose
- typescript
- bcrypt (validation)
- Zod (validation)
- eslint ( code formatting and quality checking )
- prettier (maintain code structure)


## Proper Error handling

- Validation Error
- Cast Error
-  Duplicate Entry
-  Internal Server Error

# API

Welcome to the Awesome API! This API provides various functionalities for managing courses, categories, and reviews.

## Video link API and Server testing:  https://drive.google.com/file/d/1-VQG2VEjblih9zFWECU5i5Ud3Q8cwJFn/view?usp=sharing

## Table of Contents

- [Endpoints](#endpoints)
  - [Create a Course](#create-a-course)
  - [Get Paginated and Filtered Courses](#get-paginated-and-filtered-courses)
  - [Create a Category](#create-a-category)
  - [Get All Categories](#get-all-categories)
  - [Create a Review](#create-a-review)
  - [Update a Course](#update-a-course)
  - [Get Course by ID with Reviews](#get-course-by-id-with-reviews)
  - [Get the Best Course Based on Average Review](#get-the-best-course-based-on-average-review)

## Endpoints

### Create a Course

- **Endpoint:** `/api/course`
- **Method:** `POST`
- **Request Body:** (Provide details about the expected request body)

### Get Paginated and Filtered   all Courses

- **Endpoint:** `/api/courses`
- **Method:** `GET`
- 
Query Parameters:
- page: (?page=1) Specifies the page number for paginated results.
- limit: (?limit=10) Sets the number of items per page.
- sortOrder: (?sortOrder=desc) Determines the sorting order.
- minPrice, maxPrice: (?minPrice=20.00&maxPrice=50.00) Filters results by a price range.
- tags: (?tags=Programming) Filters results by the name of a specific tag.
- startDate, endDate: (?startDate=2023-01-01&endDate=2023-12-31) Filters results by a date range.
- language: (?language=English) Filters results by the language of the course.
- provider: (?provider=Tech Academy) Filters results by the course provider.
- durationInWeeks: (?durationInWeeks=9) Filters results by the duration of the course in weeks.
- level: (?level=Intermediate) Filters results by the difficulty level of the course.
- sortBy: Specifies the field by which the results should be sorted.
Only applicable to the following fields: title, price, startDate, endDate, language, duration. Example: ?sortBy=startDate



### Create a Category

- **Endpoint:** `/api/categories`
- **Method:** `POST`
- **Request Body:** (Provide details about the expected request body)

### Get All Categories

- **Endpoint:** `/api/categories`
- **Method:** `GET`

### Create a Review

- **Endpoint:** `/api/reviews`
- **Method:** `POST`
- **Request Body:** (Provide details about the expected request body)

### Update a Course

- **Endpoint:** `/api/courses/:courseId`
- **Method:** `PUT`
- **Request Body:** (Provide details about the expected request body)
- Updating Both Primitive and Non-Primitive Data

### Get Course by ID with Reviews

- **Endpoint:** `/api/courses/:courseId/reviews`
- **Method:** `GET`

### Get the Best Course Based on Average Review

- **Endpoint:** `/api/course/best`
- **Method:** `GET`
- The response includes details about the course, its average rating, and the total number of reviews






## Getting Started
 to set up and run  projects locally
 - Colen this repository  
 - npm install
 - npm run  build
 - npm run start:dev
