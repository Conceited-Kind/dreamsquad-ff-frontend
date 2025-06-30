# DreamSquad FF - Frontend

This is the frontend for the DreamSquad Fantasy Football web application, built with React and Vite. It provides a modern, responsive user interface for drafting teams, managing leagues, and viewing player stats.

## Features

-   **Authentication:** Secure user registration and login using JWT (JSON Web Tokens).
-   **Dashboard:** An at-a-glance view of the user's team performance, league rank, and top players.
-   **Team Builder:** An interactive page for users to draft a squad of 11 players within a budget.
-   **Leagues:** Users can create new private leagues, join existing ones with a code, and view live standings.

## Tech Stack

-   **Framework:** React
-   **Build Tool:** Vite
-   **Styling:** Tailwind CSS
-   **API Communication:** Axios
-   **Routing:** React Router

## Local Setup and Installation

To run this project on your local machine, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <your-frontend-repo-url>
    cd dreamsquad-ff-frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    -   Create a file named `.env` in the root of the project.
    -   Add the following lines, replacing the placeholder with your actual Google Client ID:
        ```
        VITE_BACKEND_URL=http://localhost:5000
        VITE_GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID_HERE.apps.googleusercontent.com"
        ```

4.  **Run the development server:**
    -   Make sure the backend server is running first.
    -   Start the frontend server:
        ```bash
        npm run dev
        ```
    -   The application will be available at `http://localhost:5173`.

