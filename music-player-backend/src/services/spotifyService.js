const axios = require("axios");

const SPOTIFY_API_BASE = "https://api.spotify.com/v1";
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

const getAccessToken = async () => {
  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    null,
    {
      params: {
        grant_type: "client_credentials",
      },
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${CLIENT_ID}:${CLIENT_SECRET}`
        ).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return response.data.access_token;
};

const getTrendingSongs = async () => {
  const token = await getAccessToken();
  const response = await axios.get(`${SPOTIFY_API_BASE}/browse/new-releases`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const searchSongs = async (query) => {
  const token = await getAccessToken();
  const response = await axios.get(`${SPOTIFY_API_BASE}/search`, {
    params: {
      q: query,
      type: "track",
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const getSongByArtist = async (artist) => {
  const token = await getAccessToken();
  const response = await axios.get(`${SPOTIFY_API_BASE}/search`, {
    params: {
      q: `artist:${artist}`,
      type: "track",
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const getSongDetailsById = async (id) => {
  const token = await getAccessToken();
  const response = await axios.get(`${SPOTIFY_API_BASE}/tracks/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

module.exports = {
  getTrendingSongs,
  searchSongs,
  getSongByArtist,
  getSongDetailsById,
};
