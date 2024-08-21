# 🎵 Music Player Application

Welcome to the **Music Player Application**! This project is a full-stack application that provides a dynamic platform for managing and playing music. It features a sleek user interface built with React and a robust backend powered by Node.js and Express, with MongoDB handling data storage.

## 📁 Project Structure

The project is organized into two main parts:

- **`/frontend`**: The React.js application for the user interface.
- **`/backend`**: The Node.js and Express.js server for handling business logic and API requests.

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (or access to a MongoDB Atlas cluster)
- [npm](https://www.npmjs.com/get-npm) (comes with Node.js)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/het-shah-25/music-player.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd your-repo
   ```

3. **Install backend dependencies:**

   ```bash
   cd backend
   npm install
   ```

4. **Install frontend dependencies:**

   ```bash
   cd ../frontend
   npm install
   ```

### Configuration

1. **Set up environment variables for the backend:**

   Create a `.env` file in the `backend` directory and add the following:

   ```dotenv
   DB_URI=mongodb+srv://<username>:<password>@<cluster-url>/music_player
   JWT_SECRET=<your-jwt-secret>
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=465
   EMAIL_USERNAME=<your-email>
   EMAIL_PASSWORD=<your-email-password>
   SPOTIFY_CLIENT_ID=<your-spotify-client-id>
   SPOTIFY_CLIENT_SECRET=<your-spotify-client-secret>
   JAMENDO_CLIENT_ID=<your-jamendo-client-id>
   ```

2. **Set up any necessary frontend configuration (if applicable).**

### Running the Applications

1. **Start the backend server:**

   ```bash
   cd backend
   npm start
   ```

   The backend will be available at [http://localhost:3000](http://localhost:3000) (default port).

2. **Start the frontend development server:**

   ```bash
   cd ../frontend
   npm start
   ```

   The frontend will be available at [http://localhost:5173](http://localhost:5173).

## 📜 API Documentation

The backend provides various API endpoints for user management, music management, and playlist handling. For detailed API documentation, please refer to the [Backend README](./music-player-backend/README.md).

## 🎨 Frontend Features

The frontend offers a modern and responsive user interface, including:

- **Music Management:** Browse, search, and manage music.
- **Playlist Creation:** Create and manage playlists.
- **User Authentication:** Sign up, sign in, and manage user profiles.

For more details on the frontend, refer to the [Frontend README](./music-player-frontend/README.md).

## 🤝 Contributing

We welcome contributions to the project! To contribute:

1. **Fork the repository.**
2. **Create a new branch** (`git checkout -b feature/your-feature`).
3. **Make your changes**.
4. **Commit your changes** (`git commit -am 'Add new feature'`).
5. **Push to the branch** (`git push origin feature/your-feature`).
6. **Open a Pull Request**.

## 📧 Contact

For questions, feedback, or inquiries, please reach out to [shah2002het@gmail.com](mailto:shah2002het@gmail.com).

## 📝 License

This project is licensed under the [MIT License](LICENSE). See the LICENSE file for details.

---

Thank you for exploring the Music Player Application! 🎶
