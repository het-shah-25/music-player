const {
  fetchSongs,
  fetchSongById,
  fetchTrendingSongs,
  fetchSongsByArtist,
  fetchSongsByName,
  fetchSongsByGenre,
} = require("../services/songService");

// Controller to fetch all songs
const getAllSongs = async (req, res) => {
  try {
    const songs = await fetchSongs(req.query);
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to fetch a song by its ID
const getSongById = async (req, res) => {
  try {
    const song = await fetchSongById(req.params.id);
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }
    res.status(200).json(song);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to fetch trending songs
const getTrendingSongs = async (req, res) => {
  try {
    const songs = await fetchTrendingSongs(req.query);
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to fetch songs by artist name
const getSongsByArtist = async (req, res) => {
  try {
    const songs = await fetchSongsByArtist(req.params.artistName);
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to search songs by name
const searchSongsByName = async (req, res) => {
  try {
    const songs = await fetchSongsByName(req.query.name);
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to search songs by genre
const searchSongsByGenre = async (req, res) => {
  try {
    const songs = await fetchSongsByGenre(req.query.genre);
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllSongs,
  getSongById,
  getTrendingSongs,
  getSongsByArtist,
  searchSongsByName,
  searchSongsByGenre,
};
