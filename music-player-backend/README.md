# 🎵 Music Player Application Backend

Welcome to the Music Player Application! This project is designed to manage and play your favorite songs, create playlists, and handle user authentication. Built with Express.js and MongoDB, it offers a robust backend for your music needs.

## 📜 Overview

This application allows users to:

- Sign up, sign in, and manage their accounts
- Search for songs and browse trending tracks
- Create and manage playlists
- Integrate with Spotify and Jamendo for music streaming

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (or access to a MongoDB Atlas cluster)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/your-repo.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd your-repo
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following:

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

## ⚙️ Usage

1. **Start the server:**

   ```bash
   nodemon app.js
   ```

2. **Access the API:**

   The server will run on [http://localhost:3000](http://localhost:3000).

## 📚 API Endpoints

### Authentication

- **POST /auth/signup**: Create a new user
- **POST /auth/signin**: Sign in an existing user
- **POST /auth/validate-otp**: Validate OTP for user
- **POST /auth/resend-otp**: Resend OTP to user
- **GET /auth/me**: Get user info by token
- **GET /auth/:id**: Get user info by ID

### Songs

- **GET /songs/fetch-songs**: Get all songs with optional query parameters
- **GET /songs/:id**: Get a song by ID
- **GET /songs/trending-songs**: Get trending songs
- **GET /songs/songs-by-artist/:artistName**: Get songs by artist
- **GET /songs/search-by-name**: Search songs by name
- **GET /songs/search-by-genre**: Search songs by genre

### Playlists

- **POST /playlists/create**: Create a new playlist
- **POST /playlists/add-song**: Add a song to a playlist
- **GET /playlists/:playlistId**: Get playlist details
- **GET /playlists/**: Get all user playlists

## 🌟 Features

- **User Authentication:** Secure sign-up, sign-in, and account management
- **Music Management:** Search and browse songs, manage playlists
- **Integration:** Spotify and Jamendo API integration for enhanced music experience

## 🤝 Contributing

We welcome contributions! To contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Create a new Pull Request

## 📄 License

This project is licensed under the [MIT License](LICENSE). See the LICENSE file for details.

## 📧 Contact

For any inquiries, please reach out to [your-email@example.com](mailto:shah2002het@gmail.com).

---

Thank you for checking out the Music Player Application! 🎶
