# Backend

## Project Information

![Node.js version](https://img.shields.io/badge/Node.js-18.x-green.svg)
![NestJS version](https://img.shields.io/badge/NestJS-10.x-red.svg)
![TypeORM version](https://img.shields.io/badge/TypeORM-0.3.x-blue.svg)
![MySQL version](https://img.shields.io/badge/MySQL-8.x-orange.svg)
![JWT version](https://img.shields.io/badge/JWT-9.x-lightgrey.svg)

## Description

This is the backend service for the Vietnamese Food Restaurant application, built using **NestJS** and **TypeORM**. It provides APIs for managing users, items, orders, payments, and more. The application is designed to work with a MySQL database and supports features like authentication, authorization, and integration with third-party services like ZaloPay and Momo.

---

## Getting Started

### Prerequisites

Before running the backend, ensure you have the following installed:

- **Node.js** (v18.x or higher)
- **npm** (v9.x or higher)
- **MySQL** (v8.x or higher)
- **Git** (optional, for cloning the repository)

---

### Installation

1. **Clone the repository:**

  ```
  git clone git@github.com:DungNguyen1702/Vietnamese-Food-Restaurant.git
  cd backend
  ```

2. **Install dependencies:**

  ```
  npm install
  ```

3. **Configure environment variables:**

- Copy the .env.example file to a new file named .env:

  ```
  cp .env.example .env
  ```

- Update the `.env` file with your database credentials and other configuration settings:
  ```
  PORT=8000
  DB_HOST=your-db-host
  DB_PORT=3306
  DB_USERNAME=your-db-username
  DB_PASSWORD=your-db-password
  DB_NAME=your-db-name
  JWT_SECRET=your-jwt-secret
  API_RECOMMEND_LINK=your-recommend-link
  API_RECOGNIZE_LINK=your-recognize-link
  CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
  CLOUDINARY_API_KEY=your-cloudinary-api-key
  CLOUDINARY_API_SECRET=your-cloudinary-api-secret
  DEPLOY_SERVICE_LINK=your-deployed-service-link
  ```

4. **Set up the database:**

- Create a MySQL database named `vietnamese_food_restaurant` using your preferred tool (e.g., PhpMyAdmin, MySQL Workbench).

5. **Run `migrations`**

  - Generate a new migration (if needed):

  ```
  npm run migration:generate -- src/database/migrations/migration_name
  ```

  - Run all pending migrations:

  ```
  npm run migration:run
  ```

6. **Seed the database (optional):**

  - Run the seed script to populate the database with initial data:

  ```
  npm run seed
  ```

7. **Start the application:**

  - For development mode (with hot-reloading):

  ```
    npm run start:dev
  ```

  - For production mode:

  ```
  npm run build
  npm run start:prod
  ```

---

## API Documentation

Once the backend is running, you can access the API documentation using Swagger UI:

- **Swagger UI:** [http://localhost:8000](http://localhost:8000)

---

## Testing

  - To run the test suite, use the following command:

  ```
  npm run test
  ```
---
