import React, { useEffect, useState } from "react";
import axios from "axios";
import SongList from "../../components/core/songlist/SongList";
import PlaylistModal from "../../components/core/playlistmodal/PlaylistModal";
import PlaySongModal from "../../components/core/playsongmodal/PlaySongModal";

const SongPage = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSongId, setSelectedSongId] = useState(null);

  const [isPlayModalOpen, setIsPlayModalOpen] = useState(false); // State to manage PlaySongModal visibility
  const [selectedSong, setSelectedSong] = useState(null); // State to manage the selected song

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/songs/fetch-songs"
        );
        const songs = response.data;

        // Transform the API response to match the SongList component's props
        const formattedSongs = songs.map((song) => ({
          id: song.id,
          title: song.name,
          artist: song.artist_name,
          imageUrl: song.album_image,
          downloadUrl: song.audiodownload,
          genre: song.genre || "Unknown", // Ensure genre is included
        }));

        setSongs(formattedSongs);
      } catch (error) {
        setError("Failed to fetch songs");
        console.error("Error fetching songs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  const handlePlay = (id) => {
    const songToPlay = songs.find((song) => song.id === id);
    if (songToPlay) {
      setSelectedSong(songToPlay);
      setIsPlayModalOpen(true); // Open the PlaySongModal
    }
  };

  const handleAdd = (id) => {
    setSelectedSongId(id); // Set the selected song ID
    setIsModalOpen(true); // Open the PlaylistModal
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

  const handleMore = () => {
    console.log("Load more songs");
    // Implement load more functionality here
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the PlaylistModal
  };

  const closePlayModal = () => {
    setIsPlayModalOpen(false); // Close the PlaySongModal
  };

  // Filter songs based on search term and selected genre
  const filteredSongs = songs.filter((song) => {
    const matchesSearch =
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre =
      selectedGenre === "All" || song.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="p-6">
      {/* Search and Genre Selection */}
      <div className="mb-4 flex flex-col gap-4">
        <input
          type="text"
          placeholder="Search by title or artist..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg"
        />
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg"
        >
          <option value="All">All Genres</option>
          <option value="Pop">Pop</option>
          <option value="Rock">Rock</option>
          <option value="Hip-Hop">Hip-Hop</option>
          <option value="Jazz">Jazz</option>
          {/* Add more genres as needed */}
        </select>
      </div>

      {/* Song List */}
      <section className="py-12">
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <SongList
            songs={filteredSongs}
            onPlay={handlePlay}
            onAdd={handleAdd}
            onDownload={handleDownload}
            onMore={handleMore}
          />
        )}
      </section>

      {/* Playlist Modal Component */}
      <PlaylistModal
        isOpen={isModalOpen}
        onClose={closeModal}
        songId={selectedSongId}
      />

      {/* Play Song Modal Component */}
      {selectedSong && (
        <PlaySongModal
          visible={isPlayModalOpen}
          onClose={closePlayModal}
          song={selectedSong}
        />
      )}
    </div>
  );
};

export default SongPage;
