# Find My Recipe - Backend API

## Description

This repository contains the backend server for the "Find My Recipe" application. It is a RESTful API built with Node.js and Express that provides data on recipes and ingredients. The API connects to a PostgreSQL database to store and retrieve information, allowing users to search for recipes based on the ingredients they have.

## Key Features

- **Recipe Management**: CRUD (Create, Read, Update, Delete) operations for recipes.
- **Ingredient Database**: Manages a comprehensive list of ingredients.
- **Intelligent Search**: Find recipes that contain **all** of a given set of ingredients.
- **RESTful Endpoints**: Clear and predictable API endpoints for front-end consumption.

## Technologies Used

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Node-Postgres (`pg`)**: For communication between the Node.js server and the PostgreSQL database.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18.x or later recommended)
- npm (comes with Node.js)
- PostgreSQL

### Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone <https://github.com/rmhockey10/Capstone.FindMyRecipe.Backend.git>
    cd Capstone.FindMyRecipe.Backend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Setup the PostgreSQL Database:**

    - Log in to PostgreSQL and create a new user and database for the project.
    - _Note: Remember the username, password, and database name for the next step._

4.  **Configure Environment Variables:**

    - Create a `.env` file in the root of the project by making a copy of the example file:
      ```bash
      cp example.env
      ```
    - Open the new `.env` file and update the `DATABASE_URL` with your PostgreSQL credentials:
      ```
      # .env
      DATABASE_URL="postgresql://YOUR_USERNAME:YOUR_PASSWORD@localhost:5432/find_my_recipe"
      PORT=3000
      ```

5.  **Setup and Seed the Database:**

    - Run the following command to create the necessary tables and populate them with initial data from the seed files.
      ```bash
      npm run db:reset
      ```
    - _(Note: This command should be configured in your `package.json` to run your schema and seed files.)_

### Running the Application

- **Development Mode:** To run the server with live reloading (if using a tool like `nodemon`):
  ```bash
  npm run dev
  ```

The server will start on the port specified in your `.env` file (e.g., `http://localhost:3000`).

---

## API Endpoints

Here is a list of the available API endpoints.

### Recipes

- **`POST /api/recipes`**

  - **Description**: Finds recipes that contain ALL of the ingredients provided in the request body.
  - **Request Body**:
    ```json
    {
      "ingredients": ["Chicken", "Broccoli florets", "Soy sauce"]
    }
    ```
  - **Success Response (200 OK)**:
    ```json
    [
      {
        "id": 8,
        "name": "Beef and Broccoli Stir-Fry",
        "instructions": "[...]",
        "ingredients": ["Beef sirloin, thinly sliced", "Broccoli florets", ...]
      }
    ]
    ```
  - **Error Response (404 Not Found)**: Sent if no recipes match the criteria.

- **`GET /api/recipes/:id`**

  - **Description**: Retrieves a single recipe by its unique ID, including its full list of ingredients.
  - **Example URL**: `/api/recipes/1`
  - **Success Response (200 OK)**:
    ```json
    {
      "id": 1,
      "name": "Classic Margherita Pizza",
      "instructions": ["Preheat the oven to 475°F (245°C).", "..."],
      "ingredients": ["Pizza dough", "Tomato sauce", "..."]
    }
    ```
  - **Error Response (404 Not Found)**: Sent if no recipe with the given ID exists.

### Ingredients

- **`GET /api/ingredients`**

  - **Description**: Retrieves a list of all available ingredients, sorted alphabetically.
  - **Success Response (200 OK)**:
    ```json
    [
      { "id": 8, "name": "All-purpose flour" },
      { "id": 45, "name": "Almond milk" },
      { "id": 72, "name": "Asparagus spears, trimmed and cut into pieces" }
    ]
    ```
    **`GET /api/ingredients/:id`**

- **Description**: Retrieves a single ingredient by its unique ID.
- **Success Response (200 OK)**:

```json
{ "id": 8, "name": "All-purpose flour" }
```

---

## Authors

- **Devin Frazier** - _Database_ - [GitHub Profile](https://github.com/Dfrazier18)
- **Eric Dorsey** - _API_ - [GitHub Profile](https://github.com/ericdorsey0)
