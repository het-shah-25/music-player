require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

// Import routes
const authRoutes = require("./src/routes/authRoutes");
const songRoutes = require("./src/routes/songRouter");
const playlistRoutes = require("./src/routes/playlistRouter");
// App initialization
const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/auth", authRoutes);
app.use("/songs", songRoutes); // Use song routes
app.use("/playlists", playlistRoutes); // Use playlist routes
// Start server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
