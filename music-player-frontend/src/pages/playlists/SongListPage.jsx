import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { message } from "antd";
import SongList from "../../components/core/songlist/SongList";
import useAxios from "../../app/hook/useAxios";
import PlaySongModal from "../../components/core/playsongmodal/PlaySongModal";
const SongListPage = () => {
  const { playlistId } = useParams();
  const [songs, setSongs] = useState([]);
  const { get } = useAxios();
  const [selectedSong, setSelectedSong] = useState(null); // State to manage the currently selected song
  const [isModalVisible, setIsModalVisible] = useState(false); // State to manage the visibility of the modal

  useEffect(() => {
    if (playlistId) {
      const fetchSongs = async () => {
        try {
          // Fetch songs from API
          const response = await get(`/playlists/${playlistId}`, null, true);

          // Transform the API response to match SongList props
          const transformedSongs =
            response.songs?.map((song) => ({
              id: song.id,
              title: song.name,
              artist: song.artist_name,
              downloadUrl: song.audiodownload,
              imageUrl: song.album_image,
            })) || [];

          setSongs(transformedSongs);
        } catch (error) {
          message.error("Failed to fetch songs.");
          console.error("Error fetching songs:", error);
        }
      };

      fetchSongs();
    }
  }, [playlistId, get]);

  const handlePlay = (songId) => {
    // Find the song by its ID
    const songToPlay = songs.find((song) => song.id === songId);
    if (songToPlay) {
      setSelectedSong(songToPlay);
      setIsModalVisible(true); // Show the modal when a song is selected
    }
  };

  const handleDownload = (downloadUrl) => {
    if (downloadUrl) {
      // Create a temporary link element and trigger a download
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = ""; // Set the filename if you have it
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedSong(null); // Clear the selected song when closing the modal
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Songs in Playlist</h2>
      <SongList songs={songs} onPlay={handlePlay} onDownload={handleDownload} />

      {/* Integrate the PlaySongModal */}
      {selectedSong && (
        <PlaySongModal
          visible={isModalVisible}
          onClose={handleCloseModal}
          song={selectedSong}
        />
      )}
    </div>
  );
};

export default SongListPage;
