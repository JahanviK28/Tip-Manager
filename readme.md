# Tip Manager

Tip Manager is a web application that allows users to calculate tips and store the calculations in a database. Users can sign up, log in, calculate tips, and retrieve tips.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Postman](#postman)
- [License](#license)

## Features

- User registration and authentication
- Tip calculation based on total amount and tip percentage
- Storing tip data in a database
- Retrieving tips for a user
- Error handling and validation

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JSON Web Tokens (JWT) for authentication
- Multer for handling file uploads
- Winston for logging
- Express Validator for input validation
- Moment.js for date parsing and manipulation

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/JahanviK28/Tip-Manager.git
2. **Navigate to the project directory:**
    ```bash
    cd Tip-Manager
3. **Install dependencies:**
    ```bash
    npm install
4. **Set up environment variables:**
- Create a .env file in the root directory and add the following variables:
    ```bash
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
5. **Start the server:**
    ```bash
   npm start
 
## API Endpoints

## User Routes
- POST /api/user: Create a user/sign up
- POST /api/user/login: User login

## Tip Routes
- POST /api/tips: Create a tip
- GET /api/tips: Retrieve tips

## Postman
```bash
 https://www.postman.com/lively-spaceship-639148/workspace/tasks/collection/25125713-2a35fb8d-b12a-4bae-a526-cff8131d32f1?action=share&creator=25125713

