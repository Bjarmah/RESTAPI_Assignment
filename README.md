# Simple-API
Simple API with Pagination, filtering and sort for one of it's endpoints in Typescript


# REST API Documentation

## Base URL
`[http://localhost:3000](https://github.com/Bjarmah/Simple-API)`

## Endpoints

### Users

#### GET /users
Get a list of users.

Query Parameters:
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `sortBy` (optional): Field to sort by (id, username, email, createdAt)
- `order` (optional): Sort order (asc, desc)

Response:
```json
{
  "data": [User],
  "page": number,
  "limit": number,
  "total": number
}
```

#### POST /users
Create a new user.

Request Body:
```json
{
  "username": string,
  "email": string
}
```

#### GET /users/:id
Get a specific user by ID.

### Products

#### GET /users/:userId/products
Get all products for a specific user.

#### POST /users/:userId/products
Create a new product for a specific user.

Request Body:
```json
{
  "name": string,
  "description": string,
  "price": number
}
```

## Status Codes
- 200: Successful GET request
- 201: Successful POST request (resource created)
- 404: Resource not found
- 500: Server error
