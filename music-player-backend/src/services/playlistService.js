// const Playlist = require("../models/playlistModel");
// const axios = require("axios");

// // Helper function to fetch songs by IDs in batches
// const fetchSongsByIds = async (songIds) => {
//   try {
//     const batchSize = 50; // Adjust based on API limits
//     const batches = [];

//     for (let i = 0; i < songIds.length; i += batchSize) {
//       const batchIds = songIds.slice(i, i + batchSize);
//       const response = await axios.get("https://api.jamendo.com/v3.0/tracks", {
//         params: {
//           client_id: process.env.JAMENDO_CLIENT_ID,
//           ids: batchIds.join(","),
//         },
//       });
//       batches.push(...response.data.results);
//     }

//     return batches;
//   } catch (error) {
//     throw new Error("Error fetching songs by IDs: " + error.message);
//   }
// };

// const createNewPlaylist = async (userId, playlistName) => {
//   try {
//     const playlist = new Playlist({ name: playlistName, user: userId });
//     return await playlist.save();
//   } catch (error) {
//     throw new Error("Error creating playlist: " + error.message);
//   }
// };

// const addSongToPlaylist = async (playlistId, songId) => {
//   try {
//     const playlist = await Playlist.findById(playlistId);
//     if (!playlist) {
//       throw new Error("Playlist not found");
//     }
//     if (!playlist.songs.includes(songId)) {
//       playlist.songs.push(songId);
//       await playlist.save();
//     }
//     return playlist;
//   } catch (error) {
//     throw new Error("Error adding song to playlist: " + error.message);
//   }
// };

// const getPlaylistWithSongDetails = async (playlistId) => {
//   try {
//     const playlist = await Playlist.findById(playlistId).populate("songs");
//     if (!playlist) {
//       throw new Error("Playlist not found");
//     }

//     const songDetails = await fetchSongsByIds(playlist.songs);
//     return { ...playlist.toObject(), songs: songDetails };
//   } catch (error) {
//     throw new Error(
//       "Error fetching playlist with song details: " + error.message
//     );
//   }
// };
// const getPlaylistsByUserId = async (userId) => {
//   try {
//     const playlists = await Playlist.find({ user: userId });
//     return playlists;
//   } catch (err) {
//     throw new Error("Error fetching playlists: " + err.message);
//   }
// };

// module.exports = {
//   createNewPlaylist,
//   addSongToPlaylist,
//   getPlaylistWithSongDetails,
//   getPlaylistsByUserId,
// };
const Playlist = require("../models/playlistModel");
const axios = require("axios");
const { fetchSongById } = require("../services/songService");

const createNewPlaylist = async (userId, playlistName) => {
  try {
    const playlist = new Playlist({ name: playlistName, user: userId });
    return await playlist.save();
  } catch (error) {
    throw new Error("Error creating playlist: " + error.message);
  }
};

const addSongToPlaylist = async (playlistId, songId) => {
  try {
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      throw new Error("Playlist not found");
    }
    if (!playlist.songs.includes(songId)) {
      playlist.songs.push(songId);
      await playlist.save();
    }
    return playlist;
  } catch (error) {
    throw new Error("Error adding song to playlist: " + error.message);
  }
};

const getPlaylistWithSongDetails = async (playlistId) => {
  try {
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      throw new Error("Playlist not found");
    }

    const songDetailsPromises = playlist.songs.map(async (songId) => {
      try {
        const song = await fetchSongById(songId);
        return song;
      } catch (error) {
        console.error(
          `Error fetching song with ID ${songId}: ${error.message}`
        );
        return null;
      }
    });

    const songDetails = await Promise.all(songDetailsPromises);
    return {
      ...playlist.toObject(),
      songs: songDetails.filter((song) => song !== null),
    };
  } catch (error) {
    throw new Error(
      "Error fetching playlist with song details: " + error.message
    );
  }
};

const getPlaylistsByUserId = async (userId) => {
  try {
    const playlists = await Playlist.find({ user: userId });
    return playlists;
  } catch (err) {
    throw new Error("Error fetching playlists: " + err.message);
  }
};

module.exports = {
  createNewPlaylist,
  addSongToPlaylist,
  getPlaylistWithSongDetails,
  getPlaylistsByUserId,
};
