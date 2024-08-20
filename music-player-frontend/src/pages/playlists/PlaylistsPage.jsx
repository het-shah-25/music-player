import React, { useEffect, useState, useCallback } from "react";
import { Input, message } from "antd";
import axios from "axios";
import CustomModal from "../../components/core/custommodel/CustomModal";
import { useNavigate } from "react-router-dom";

const PlaylistsPage = () => {
  const [playlists, setPlaylists] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const navigate = useNavigate();

  // Function to fetch playlists from the API
  const fetchPlaylists = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://music-player-backend-q9p5.onrender.com/playlists",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPlaylists(response.data);
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  }, []);

  // Fetch playlists when the component mounts
  useEffect(() => {
    fetchPlaylists();
  }, [fetchPlaylists]);

  // Function to handle creating a new playlist
  const handleSubmit = async () => {
    if (newPlaylistName.trim()) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          "https://music-player-backend-q9p5.onrender.com/playlists/create",
          { name: newPlaylistName },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPlaylists((prevPlaylists) => [...prevPlaylists, response.data]);
        handleCloseModal();
        message.success("Playlist created successfully!");
      } catch (error) {
        message.error("Failed to create playlist.");
        console.error("Error creating playlist:", error);
      }
    } else {
      message.warning("Please enter a playlist name.");
    }
  };

  // Function to open the create playlist modal
  const handleCreatePlaylist = () => {
    setIsModalVisible(true);
  };

  // Function to close the create playlist modal
  const handleCloseModal = () => {
    setIsModalVisible(false);
    setNewPlaylistName("");
  };

  // Function to handle redirecting to the SongPage with selected playlist ID
  const handleViewSongs = useCallback(
    (playlistId) => {
      navigate(`/songs/${playlistId}`);
    },
    [navigate]
  );

  return (
    <div className="flex p-6">
      {/* Playlist Folder View */}
      <main className="flex-1 bg-gray-100 p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Your Playlists</h2>
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-purple-700 transition duration-300"
            onClick={handleCreatePlaylist}
          >
            Create Playlist
          </button>
        </div>
        <div className="space-y-4">
          {playlists.map((playlist) => (
            <div
              key={playlist._id}
              className="bg-white p-4 rounded-lg shadow-lg flex items-center space-x-4 cursor-pointer hover:bg-gray-200 transition duration-300"
              onClick={() => handleViewSongs(playlist._id)} // Make the entire div clickable
            >
              <div className="bg-gray-300 w-12 h-12 rounded-md flex items-center justify-center">
                <span className="text-gray-600 text-xl">📁</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold truncate">
                  {playlist.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Create Playlist Modal */}
      <CustomModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        title="Create New Playlist"
      >
        <Input
          placeholder="Enter playlist name"
          value={newPlaylistName}
          onChange={(e) => setNewPlaylistName(e.target.value)}
        />
      </CustomModal>
    </div>
  );
};

export default PlaylistsPage;
