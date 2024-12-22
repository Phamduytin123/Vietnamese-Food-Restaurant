# Frontend

## Project Information

![React version](https://img.shields.io/badge/React-18.3.1-blue.svg)
![React Router version](https://img.shields.io/badge/React%20Router-6.26.2-orange.svg)
![Ant Design version](https://img.shields.io/badge/Ant%20Design-5.21.3-blue.svg)
![Bootstrap version](https://img.shields.io/badge/Bootstrap-5.3.3-purple.svg)

## Description

This is the frontend application for the Vietnamese Food Restaurant project, built using **React** and **Bootstrap**. It provides a user-friendly interface for customers to browse items, place orders, and interact with the system. The application is designed to work with the backend API and supports features like authentication, cart management, and payment integration.

---

## Getting Started

### Prerequisites

Before running the frontend, ensure you have the following installed:

- **Node.js** (v16.x or higher)
- **npm** (v8.x or higher)
- **Git** (optional, for cloning the repository)

---

### Installation

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

## Features

- **User Authentication:** Login, register, and manage user profiles.
- **Item Browsing:** Browse and search for food items.
- **Cart Management:** Add, remove, and update items in the cart.
- **Order Placement:** Place orders and make payments using integrated payment gateways.
- **Admin Dashboard:** Manage items, orders, and users (if applicable).

---

## API Integration

The frontend application interacts with the backend API to fetch and send data. The API URL is configured in the `.env` file.

---