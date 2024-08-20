const {
  getTrendingSongs,
  searchSongs,
  getSongByArtist,
  getSongDetailsById,
} = require("../services/spotifyService");

const fetchTrendingSongs = async (req, res) => {
  try {
    const data = await getTrendingSongs();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const fetchSearchSongs = async (req, res) => {
  try {
    const query = req.query.q;
    const data = await searchSongs(query);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const fetchSongsByArtist = async (req, res) => {
  try {
    const artist = req.params.name;
    const data = await getSongByArtist(artist);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const fetchSongDetailsById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await getSongDetailsById(id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  fetchTrendingSongs,
  fetchSearchSongs,
  fetchSongsByArtist,
  fetchSongDetailsById,
};
