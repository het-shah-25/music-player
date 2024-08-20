const express = require("express");
const {
  fetchTrendingSongs,
  fetchSearchSongs,
  fetchSongsByArtist,
  fetchSongDetailsById,
} = require("../controllers/spotifyController");

const router = express.Router();

router.get("/trending", fetchTrendingSongs);
router.get("/search", fetchSearchSongs);
router.get("/artist/:name", fetchSongsByArtist);
router.get("/track/:id", fetchSongDetailsById);

module.exports = router;
