const axios = require("axios");

const JAMENDO_API_URL = "https://api.jamendo.com/v3.0";
const CLIENT_ID = process.env.JAMENDO_CLIENT_ID;

// Fetch songs from Jamendo with optional query parameters
const fetchSongs = async (queryParams) => {
  try {
    const response = await axios.get(`${JAMENDO_API_URL}/tracks`, {
      params: {
        client_id: CLIENT_ID,
        ...queryParams,
      },
    });
    return response.data.results;
  } catch (error) {
    throw new Error("Error fetching songs from Jamendo: " + error.message);
  }
};

// Fetch a song by ID from Jamendo
const fetchSongById = async (id) => {
  try {
    const response = await axios.get(`${JAMENDO_API_URL}/tracks`, {
      params: {
        client_id: CLIENT_ID,
        id: id,
      },
    });
    return response.data.results[0];
  } catch (error) {
    throw new Error("Error fetching song by ID: " + error.message);
  }
};

// Fetch trending songs
const fetchTrendingSongs = async (queryParams) => {
  try {
    // Example: Set query parameters to fetch popular tracks
    const trendingQueryParams = {
      ...queryParams,
      order_by: "popularity",
      limit: 10, // Adjust the limit as needed
    };
    return await fetchSongs(trendingQueryParams);
  } catch (error) {
    throw new Error("Error fetching trending songs: " + error.message);
  }
};

// Fetch songs by artist name
const fetchSongsByArtist = async (artistName) => {
  try {
    return await fetchSongs({ artist_name: artistName });
  } catch (error) {
    throw new Error("Error fetching songs by artist: " + error.message);
  }
};

// Fetch songs by name
const fetchSongsByName = async (songName) => {
  try {
    return await fetchSongs({ name: songName });
  } catch (error) {
    throw new Error("Error fetching songs by name: " + error.message);
  }
};

const fetchSongsByGenre = async (genre) => {
  try {
    return await fetchSongs({ tags: genre });
  } catch (error) {
    throw new Error("Error fetching songs by genre: " + error.message);
  }
};

module.exports = {
  fetchSongs,
  fetchSongById,
  fetchTrendingSongs,
  fetchSongsByArtist,
  fetchSongsByName,
  fetchSongsByGenre,
};
