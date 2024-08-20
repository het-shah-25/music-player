//songRouter.js
const express = require("express");
const router = express.Router();
const {
  getAllSongs,
  getSongById,
  getTrendingSongs,
  getSongsByArtist,
  searchSongsByName,
  searchSongsByGenre,
} = require("../controllers/songController");

// Route to get all songs with optional query parameters
router.get("/fetch-songs", getAllSongs);

// Route to get a song by its ID
router.get("/:id", getSongById);

// Route to get trending songs
router.get("/trending-songs", getTrendingSongs);

// Route to get songs by artist name
router.get("/songs-by-artist/:artistName", getSongsByArtist);

// Route to search songs by name
router.get("/search-by-name", searchSongsByName);

// Route to search songs by genre
router.get("/search-by-genre", searchSongsByGenre);

module.exports = router;
