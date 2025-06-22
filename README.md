# Library Mangagement Api

This app provides a REST API to create, update, delete, and retrieve books, as well as to manage book borrowing.

### Used Technologies:

- Express.js
- TypeScript
- MongoDB (Mongoose)

### Features:

- Create new book, View single book, View all books, Update book details and Delete book.
- Borrow book, view all borrow details with total sell of each book
- Proper Validation

## # Installation & Setup :

### Clone the Repository:

```plain
git clone https://github.com/md-suhag/library-management-api.git
```

### Install Dependencies:

```markdown
npm install
```

### Environment Variables:

- Create a `.env` file in the root directory.
- Add the following environment variables:

```markdown
PORT=4000
DATABASE_URI=your_database_url
```

### Run the Application:

```markdown
npm run dev
```

## # API Endpoints:

### 1. Create Book

- Endpoint: `POST /api/books`
- Request Body:

```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}
```

- Response Body:

```json
{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 5,
    "available": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T10:23:45.123Z"
  }
}
```

### 2. Get All Books

- Endpoint: `GET /api/books`

#### Example Query

```
/api/books?filter=SCIENCE&sortBy=createdAt&sort=desc&limit=5
```

- Response Body:

```json
{
  "success": true,
  "message": "Books retrieved successfully",
  "data": [
    {
      "_id": "64f123abc4567890def12345",
      "title": "The Theory of Everything",
      "author": "Stephen Hawking",
      "genre": "SCIENCE",
      "isbn": "9780553380163",
      "description": "An overview of cosmology and black holes.",
      "copies": 5,
      "available": true,
      "createdAt": "2024-11-19T10:23:45.123Z",
      "updatedAt": "2024-11-19T10:23:45.123Z"
    }
    {...}
  ]
}
```

### 3. Get Book by ID

- Endpoint: `GET  /api/books/:bookId`

- Response Body:

```json
{
  "success": true,
  "message": "Book retrieved successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 5,
    "available": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T10:23:45.123Z"
  }
}
```

### 4. Update Book

- Endpoint: `PUT /api/books/:bookId`

- Request Body:

```json
{
  "copies": 50
}
```

- Response Body:

```json
{
  "success": true,
  "message": "Book updated successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 50,
    "available": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-20T08:30:00.000Z"
  }
}
```

### 5. Delete Book

- Endpoint: `DELETE /api/books/:bookId`

- Response Body:

```json
{
  "success": true,
  "message": "Book deleted successfully",
  "data": null
}
```

### 6. Borrow a Book

- Endpoint: `POST /api/borrow`

- Request Body:

```json
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

- Response Body:

```json
{
  "success": true,
  "message": "Book borrowed successfully",
  "data": {
    "_id": "64bc4a0f9e1c2d3f4b5a6789",
    "book": "64ab3f9e2a4b5c6d7e8f9012",
    "quantity": 2,
    "dueDate": "2025-07-18T00:00:00.000Z",
    "createdAt": "2025-06-18T07:12:15.123Z",
    "updatedAt": "2025-06-18T07:12:15.123Z"
  }
}
```

### 7. Borrowed Books Summary

- Endpoint: `GET /api/borrow`

- Response Body:

```json
{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      },
      "totalQuantity": 5
    },
    {
      "book": {
        "title": "1984",
        "isbn": "9780451524935"
      },
      "totalQuantity": 3
    }
  ]
}
```

### Error Handling

The application handles errors such as validation errors, duplicate entries, and not found routes with appropriate error messages and status codes.
