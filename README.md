# Project-name:  Course-Review

## Project-type: DataBase and API Design follow Module Pattern
## Live link:  https://course-review-nine.vercel.app/

## Technology use 
- Node js
- Express js
- Mongoose
- typescript
- JWT(validation)
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

## Table of Contents for  users

- **Endpoint:** `/api/auth/register`
- **Method:** `POST`
- **Request Body:** data formate like this *

  
```json

{
  "username": "your_username",
  "password": "your_password",
  "email": "your_email@example.com",
  "role": "user"/"admin"
}

```



- **Endpoint:** `/api/auth/login`
- **Method:** `POST`
- **Request Body:** data formate like this *



```json

{
  "username": "your_username",
  "password": "your_password"
}


```

## Table of Contents for courses

   - [Endpoints](#endpoints)
  - [Create a Course](#create-a-course)
  - [Get Paginated and Filtered Courses](#get-paginated-and-filtered-courses)
  - [Get  single Courses by ID](#get-single-course-by-id)
  - [Create a Category](#create-a-category)
  - [Delete a Course](#delete-a-course)
  - [Update a Course](#update-a-course)
  - [Get All Categories](#get-all-categories)
  - [Create a Review](#create-a-review)
 - [Get Course by ID with Reviews](#get-course-by-id-with-reviews)
  - [Get the Best Course Based on Average Review](#get-the-best-course-based-on-average-review)

## Endpoints

### Create a Course

- **Endpoint:** `/api/course`
- **Method:** `POST`
- **Access:** `admin`
- **Request Body:** data formate like this *
-  "durationInWeeks": Calclute by Backend.  
  
```json
{
    "title": "Backend Development: Building Scalable and Robust Systems",
    "instructor": "Prof. Alex Johnson",
    "categoryId": "123456789012345678901234",
    "price": 89.99,
    "tags": [
        {
            "name": "Backend Development",
            "isDeleted": false
        },
        {
            "name": "Server-Side Programming",
            "isDeleted": false
        },
        {
            "name": "Database Management",
            "isDeleted": false
        }
    ],
    "topics": [
        "Introduction to Backend Development",
        "Server-Side Programming with Node.js",
        "RESTful API Design Principles",
        "Database Design and Management",
        "Authentication and Authorization",
        "Handling User Sessions and Cookies",
        "Error Handling and Logging",
        "Testing and Debugging in Backend Development",
        "Performance Optimization and Caching",
        "Security Best Practices for Backend Systems",
        "Scalability and Load Balancing",
        "Containerization with Docker for Backend Applications"
    ],
    "classDays": [
        "Tuesday",
        "Thursday",
        "Saturday"
    ],
    "startDate": "2023-03-01",
    "endDate": "2023-05-15",
    "language": "English",
    "provider": "Backend Dev Pro Institute",
    "classTime": "18:30 - 20:30",
    "details": {
        "level": "Intermediate",
        "description": "Join Prof. Alex Johnson in our Backend Development course and learn to build scalable and robust systems. Covering server-side programming with Node.js, RESTful API design, database management, and various aspects of backend development, this course is designed for intermediate-level developers. Classes are scheduled on Tuesdays, Thursdays, and Saturdays from 18:30 to 20:30, starting on March 1, 2023, and concluding on May 15, 2023. Gain the skills to create efficient and secure backend systems that power modern web applications."
    }
}

```


### Get Paginated and Filtered   all Courses

- **Endpoint:** `/api/courses`
- **Method:** `GET`
  
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


### Get  single Courses by ID

- **Endpoint:** `/api/course/:id`
- **Method:** `GET`


### Delete a Course

- **Endpoint:** `/api/course/:courseId`
- **Method:** `delete`
- **Access:** `admin`

### Update a Course

- **Endpoint:** `/api/course/:courseId`
- **Method:** `PUT`
- **Access:** `admin`
- Updating Both Primitive and Non-Primitive Data


### Create a Category

- **Endpoint:** `/api/categories`
- **Method:** `POST`
- **Access:** `admin`

- **Request Body:** (Provide details about the expected request body)

### Get All Categories

- **Endpoint:** `/api/categories`
- **Method:** `GET`

### Create a Review

- **Endpoint:** `/api/reviews`
- **Method:** `POST`
- **Request Body:** ( data formate like this)


```json
{

     "userId": "658084a5c04a17a769b18e10",
    "username":"Rezoanul hasan",
    "courseId": "658046adc644094fc264c0d7",
     "rating": 4,
    "review": "Great course!"
}
```

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
 - npm run build
 - npm run start:dev
