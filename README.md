# VIETNAMESE FOOD RESTAURANT

---
The project is about creating an online food ordering system for a Vietnamese restaurant, with three primary roles: the Restaurant Owner, Customer, and Restaurant Staff. Customers can browse the available menu, receive dish recommendations, search for food using images, place orders, add items to their cart, view transaction history, like, and rate dishes. The Restaurant Owner has the ability to manage sales reports by day, month, or custom date range, oversee the menu, manage customers, staff, and all orders. Restaurant Staff are responsible for managing customer orders, tracking sales statistics, and managing the menu and customer information. This system aims to streamline operations for the restaurant while enhancing the customer experience.

---
## Backend

### Project Information

![Node.js version](https://img.shields.io/badge/Node.js-18.x-green.svg)
![NestJS version](https://img.shields.io/badge/NestJS-10.x-red.svg)
![TypeORM version](https://img.shields.io/badge/TypeORM-0.3.x-blue.svg)
![MySQL version](https://img.shields.io/badge/MySQL-8.x-orange.svg)
![JWT version](https://img.shields.io/badge/JWT-9.x-lightgrey.svg)

### Description

This is the backend service for the Vietnamese Food Restaurant application, built using **NestJS** and **TypeORM**. It provides APIs for managing users, items, orders, payments, and more. The application is designed to work with a MySQL database and supports features like authentication, authorization, and integration with third-party services like ZaloPay and Momo.

---

### Getting Started

#### Prerequisites

Before running the backend, ensure you have the following installed:

- **Node.js** (v18.x or higher)
- **npm** (v9.x or higher)
- **MySQL** (v8.x or higher)
- **Git** (optional, for cloning the repository)

---

#### Installation

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

### API Documentation

Once the backend is running, you can access the API documentation using Swagger UI:

- **Swagger UI:** [http://localhost:8000](http://localhost:8000)

---

### Testing

  - To run the test suite, use the following command:

  ```
  npm run test
  ```
---

## Frontend

### Project Information

![React version](https://img.shields.io/badge/React-18.3.1-blue.svg)
![React Router version](https://img.shields.io/badge/React%20Router-6.26.2-orange.svg)
![Ant Design version](https://img.shields.io/badge/Ant%20Design-5.21.3-blue.svg)
![Bootstrap version](https://img.shields.io/badge/Bootstrap-5.3.3-purple.svg)

### Description

This is the frontend application for the Vietnamese Food Restaurant project, built using **React** and **Bootstrap**. It provides a user-friendly interface for customers to browse items, place orders, and interact with the system. The application is designed to work with the backend API and supports features like authentication, cart management, and payment integration.

---

### Getting Started

#### Prerequisites

Before running the frontend, ensure you have the following installed:

- **Node.js** (v16.x or higher)
- **npm** (v8.x or higher)
- **Git** (optional, for cloning the repository)

---

#### Installation

1. **Clone the repository:**

   ```
   git clone https://github.com/your-repo/frontend.git
   cd frontend
   ```

2. **Install dependencies:**

   ```
   npm install
   ```

3. **Configure environment variables:**

   - Copy the `.env.example` file to a new file named `.env`:

     ```
     cp .env.example .env
     ```

   - Update the `.env` file with your backend API URL and other configuration settings:

     ```env
     REACT_APP_API_URL=your-api-link
     REACT_APP_REDIRECT_URL=your-deployed-frontend-link
     ```

4. **Start the application:**

   - For development mode (with hot-reloading):

     ```
     npm start
     ```

   - For production mode:

     ```
     npm run build
     ```

---

### Features

- **User Authentication:** Login, register, and manage user profiles.
- **Item Browsing:** Browse and search for food items.
- **Cart Management:** Add, remove, and update items in the cart.
- **Order Placement:** Place orders and make payments using integrated payment gateways.
- **Admin Dashboard:** Manage items, orders, and users (if applicable).

---

### API Integration

The frontend application interacts with the backend API to fetch and send data. The API URL is configured in the `.env` file.

---

## Demo UI

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
  <div style="display: flex; justify-content: center; align-items: center; overflow: hidden; height: 200px; border: 1px solid #ccc; border-radius: 8px;">
    <img src="/demo/1.png" alt="Demo Image 1" style="max-width: 100%; max-height: 100%;">
  </div>
  <div style="display: flex; justify-content: center; align-items: center; overflow: hidden; height: 200px; border: 1px solid #ccc; border-radius: 8px;">
    <img src="/demo/2.png" alt="Demo Image 2" style="max-width: 100%; max-height: 100%;">
  </div>
  <div style="display: flex; justify-content: center; align-items: center; overflow: hidden; height: 200px; border: 1px solid #ccc; border-radius: 8px;">
    <img src="/demo/3.png" alt="Demo Image 3" style="max-width: 100%; max-height: 100%;">
  </div>
  <div style="display: flex; justify-content: center; align-items: center; overflow: hidden; height: 200px; border: 1px solid #ccc; border-radius: 8px;">
    <img src="/demo/4.png" alt="Demo Image 4" style="max-width: 100%; max-height: 100%;">
  </div>
  <div style="display: flex; justify-content: center; align-items: center; overflow: hidden; height: 200px; border: 1px solid #ccc; border-radius: 8px;">
    <img src="/demo/5.png" alt="Demo Image 5" style="max-width: 100%; max-height: 100%;">
  </div>
  <div style="display: flex; justify-content: center; align-items: center; overflow: hidden; height: 200px; border: 1px solid #ccc; border-radius: 8px;">
    <img src="/demo/6.png" alt="Demo Image 6" style="max-width: 100%; max-height: 100%;">
  </div>
  <div style="display: flex; justify-content: center; align-items: center; overflow: hidden; height: 200px; border: 1px solid #ccc; border-radius: 8px;">
    <img src="/demo/7.png" alt="Demo Image 7" style="max-width: 100%; max-height: 100%;">
  </div>
  <div style="display: flex; justify-content: center; align-items: center; overflow: hidden; height: 200px; border: 1px solid #ccc; border-radius: 8px;">
    <img src="/demo/8.png" alt="Demo Image 8" style="max-width: 100%; max-height: 100%;">
  </div>
  <div style="display: flex; justify-content: center; align-items: center; overflow: hidden; height: 200px; border: 1px solid #ccc; border-radius: 8px;">
    <img src="/demo/9.png" alt="Demo Image 9" style="max-width: 100%; max-height: 100%;">
  </div>
  <div style="display: flex; justify-content: center; align-items: center; overflow: hidden; height: 200px; border: 1px solid #ccc; border-radius: 8px;">
    <img src="/demo/10.png" alt="Demo Image 10" style="max-width: 100%; max-height: 100%;">
  </div>
  <div style="display: flex; justify-content: center; align-items: center; overflow: hidden; height: 200px; border: 1px solid #ccc; border-radius: 8px;">
    <img src="/demo/11.png" alt="Demo Image 11" style="max-width: 100%; max-height: 100%;">
  </div>
  <div style="display: flex; justify-content: center; align-items: center; overflow: hidden; height: 200px; border: 1px solid #ccc; border-radius: 8px;">
    <img src="/demo/12.png" alt="Demo Image 12" style="max-width: 100%; max-height: 100%;">
  </div>
</div>
