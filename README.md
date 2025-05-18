# Evee API - Node.js/Express.js Version

A production-ready Node.js/Express.js backend API for the Evee application.

## Features

- Express.js REST API
- MongoDB with Mongoose
- JWT Authentication
- Environment-based configuration
- Error handling middleware
- CORS support
- Request logging

## Prerequisites

- Node.js (v14 or higher)
- MongoDB instance
- npm or yarn

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=8000
   MONGODB_URL=your_mongodb_url
   MONGODB_DB_NAME=evee
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=30m
   NODE_ENV=development
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication

- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/me` - Get current user (requires authentication)

## Development

- `npm run dev` - Start development server with hot reload
- `npm start` - Start production server

## Production

For production deployment:

1. Set `NODE_ENV=production` in your environment
2. Use a process manager like PM2
3. Set up proper MongoDB authentication
4. Use a strong JWT secret
5. Configure CORS properly for your domain 