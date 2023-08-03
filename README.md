<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Bookstore APIs - Nest.js Project
This is a Nest.js project that provides APIs for a bookstore. It allows users to browse and purchase books using points. The book data includes title, writer, cover image, price (in points), and tags.


## Data on Book
The book data will be stored in a relational database (RDB) after setting up the schema. Each book will have the following attributes:

* Title
* Writer
* Cover Image (URL)
* Point (Price in points)
* Tags (can have multiple tags, e.g., "fiction", "non-fiction", "science", "essay")

## Infrastructure Condition
# The project uses the following technologies and follows specific folder structure:

Technologies:

* Nest.js: A progressive Node.js framework for building efficient and scalable server-side applications.
* RabbitMQ: A message broker that will be used to save API request logs.
* Prisma.js: An Object-Relational Mapping (ORM) tool for Node.js to interact with the database.
* Postgresql: The chosen database for storing book and customer data.
### Folder Structure:

```bash
- src/
  - controllers/     # Handles HTTP requests and responses
  - services/        # Contains business logic
  - repositories/    # Contains SQL or query operations (without business logic)
  - entities/        # Database models
```

## Situation Condition
The application implements the basic features for a bookstore without focusing on complex login processes. When a new customer is created, they are assigned 100 points, which can be used to purchase books.

## Required APIs
The following APIs are necessary for the bookstore:

Order: To place an order for a book using points.
Cancel Order: To cancel an existing order.
List of Buy (Infinite Scroll): To retrieve a list of purchased books with infinite scroll.

## API Documentations
The API documentation is provided using Swagger or any other format like markdown. It allows developers to understand the available endpoints, their inputs, and responses.

## Additional Info
This project aims to simulate a normal online bookstore similar to Amazon Books. The reference to Amazon is for inspiration, and the focus is on building a functional bookstore with the specified features.

The usage of RabbitMQ demonstrates the familiarity with message queues. Other features can also utilize message queues if needed.

Feel free to explore the code and build upon it for your custom requirements. Happy coding!

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

### Bookstore API Documentation

This API documentation provides details about the endpoints and functionalities of the Bookstore API.


### Base URL
```
  localhost:3000/books
```


### Endpoints

## Get All Books
Endpoint: GET /books

Description: Get a list of all books available in the bookstore.

Response:

* Status Code: 200 (OK)
* Content-Type: application/json

### Example Response:

```json
  [
    {
      "id": 1,
      "title": "Book 1",
      "writer": "Author 1",
      "coverImage": "https://example.com/book1.jpg",
      "point": 50,
      "tags": ["fiction", "adventure"]
    },
    {
      "id": 2,
      "title": "Book 2",
      "writer": "Author 2",
      "coverImage": "https://example.com/book2.jpg",
      "point": 30,
      "tags": ["non-fiction", "biography"]
    },
]

```

### Login
Endpoint: POST /books/login

Description: Authenticate the user with their credentials.

Request Body:

```json
  {
    "email": "admin@test.com",
    "password": "password"
  }
```

Response:

* Status Code: 200 (OK) - For successful login
* Status Code: 401 (Unauthorized) - For invalid credentials

- Example Response (Success):
  ```json
  {
    "message": "Login successful",
    "points": 100
  }
  ```

### Order Book
Endpoint: POST /books/order/:bookId

Description: Place an order for a book using points.

Response:

* Status Code: 200 (OK) - For successful order
* Status Code: 400 (Bad Request) - If the user does not have sufficient points

- Example Response (Success):

```json
  {
    "message": "Book ordered successfully!"
  }
```

### Cancel Order

Endpoint: DELETE /books/order/:orderId

Description: Cancel an existing order.

Response:

* Status Code: 200 (OK) - For successful order cancellation
* Status Code: 404 (Not Found) - If the order with the given orderId does not exist

- Example Response (Success):

```json
  {
  "message": "Order canceled successfully!"
  }
```

### List of Purchased Books

Endpoint: GET /books/purchased?page=1&limit=10

Description: Retrieve a list of purchased books with infinite scroll.

Response:

* Status Code: 200 (OK)
* Content-Type: application/json

Example Response:

```json
  [
    {
      "id": 1,
      "title": "Book 1",
      "writer": "Author 1",
      "coverImage": "https://example.com/book1.jpg",
      "point": 50,
      "tags": ["fiction", "adventure"]
    },
    {
      "id": 3,
      "title": "Book 3",
      "writer": "Author 3",
      "coverImage": "https://example.com/book3.jpg",
      "point": 20,
      "tags": ["science", "educational"]
    },
]
```