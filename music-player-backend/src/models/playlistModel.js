const mongoose = require("mongoose");

const PlaylistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
  songs: [{ type: String }],
});

module.exports = mongoose.model("Playlist", PlaylistSchema);
