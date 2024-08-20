import React, { useState, useEffect } from "react";
import useAxios from "../../../app/hook/useAxios";
const PlaylistModal = ({ isOpen, onClose, songId }) => {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
  const { get, post } = useAxios();

  useEffect(() => {
    if (isOpen) {
      const fetchPlaylists = async () => {
        try {
          const data = await get("/playlists", null, true);
          setPlaylists(data);
        } catch (error) {
          console.error("Error fetching playlists:", error);
        }
      };

      fetchPlaylists();
    }
  }, [isOpen, get]);

  const handleAddToPlaylist = async () => {
    if (selectedPlaylistId && songId) {
      try {
        await post(
          "playlists/add-song",
          { playlistId: selectedPlaylistId, songId: songId },
          true
        );
        alert("Song added to playlist successfully!");
        onClose();
      } catch (error) {
        console.error("Error adding song to playlist:", error);
        alert("Failed to add song to playlist.");
      }
    } else {
      alert("Please select a playlist.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Select Playlist</h2>
        <select
          value={selectedPlaylistId || ""}
          onChange={(e) => setSelectedPlaylistId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        >
          <option value="">Select a playlist</option>
          {playlists.map((playlist) => (
            <option key={playlist._id} value={playlist._id}>
              {playlist.name}
            </option>
          ))}
        </select>
        <div className="flex justify-end">
          <button
            onClick={handleAddToPlaylist}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add to Playlist
          </button>
          <button
            onClick={onClose}
            className="ml-4 px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaylistModal;
