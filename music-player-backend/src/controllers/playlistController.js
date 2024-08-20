// src/controllers/playlistController.js
const {
  createNewPlaylist,
  addSongToPlaylist,
  getPlaylistWithSongDetails,
  getPlaylistsByUserId,
} = require("../services/playlistService");

const createPlaylist = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user.user.id;
    const playlist = await createNewPlaylist(userId, name);
    res.status(201).json(playlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addSong = async (req, res) => {
  try {
    const { playlistId, songId } = req.body;
    const updatedPlaylist = await addSongToPlaylist(playlistId, songId);
    res.status(200).json(updatedPlaylist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPlaylistDetails = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const playlist = await getPlaylistWithSongDetails(playlistId);
    res.status(200).json(playlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getUserPlaylists = async (req, res) => {
  try {
    const userId = req.user.user.id; // Extract user ID from token
    const playlists = await getPlaylistsByUserId(userId);

    if (playlists.length === 0) {
      return res
        .status(404)
        .json({ message: "No playlists found for this user" });
    }

    res.status(200).json(playlists);
  } catch (err) {
    res.status(500).json({ error: "Error fetching playlists: " + err.message });
  }
};

module.exports = {
  createPlaylist,
  addSong,
  getPlaylistDetails,
  getUserPlaylists,
};
