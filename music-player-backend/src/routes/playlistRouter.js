const express = require("express");
const { authenticateToken } = require("../helpers/authMiddleware");
const {
  createPlaylist,
  addSong,
  getPlaylistDetails,
  getUserPlaylists,
} = require("../controllers/playlistController");

const router = express.Router();

router.post("/create", authenticateToken, createPlaylist);
router.post("/add-song", authenticateToken, addSong);
router.get("/:playlistId", authenticateToken, getPlaylistDetails);
router.get("/", authenticateToken, getUserPlaylists);

module.exports = router;
