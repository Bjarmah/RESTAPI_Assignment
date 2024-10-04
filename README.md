# User and Product Management API

This API provides endpoints for managing users and their associated products.

## Features
- User management (create, read)
- Product management per user
- Pagination, sorting, and filtering
- OpenAPI/Swagger documentation

## Live Demo
API Endpoint: [Main App](https://whispering-tor-63318-814178c6cfe8.herokuapp.com)  
API Documentation: [api-docs](https://whispering-tor-63318-814178c6cfe8.herokuapp.com/api-docs) 

## Technologies Used
- Node.js
- Express
- TypeScript
- OpenAPI/Swagger for documentation

## Local Development

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation
1. Clone the repository
```bash
git clone https://github.com/yourusername/your-api-repo.git
cd your-api-repo
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

## API Endpoints
 
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /users   | Get all users (with pagination) |
| POST   | /users   | Create a new user |
| GET    | /users/:id | Get a specific user |
| GET    | /users/:id/products | Get all products for a user |
| POST   | /users/:id/products | Create a product for a user |

For detailed API documentation, please visit the [API Documentation](https://your-api-url.herokuapp.com/api-docs) page.

## Deployment
This API is deployed on Heroku. To deploy your own instance:

1. Install the Heroku CLI
2. Login to Heroku: `heroku login`
3. Create a new Heroku app: `heroku create`
4. Deploy: `git push heroku main`

## Contributing
1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

## License
This project is licensed under the MIT License - see the LICENSE file for details
## Status Codes
- 200: Successful GET request
- 201: Successful POST request (resource created)
- 404: Resource not found
- 500: Server error
