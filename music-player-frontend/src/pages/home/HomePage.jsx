import React, { useEffect, useState } from "react";
import axios from "axios";
import SongList from "../../components/core/songlist/SongList";
import PlaylistModal from "../../components/core/playlistmodal/PlaylistModal";
import PlaySongModal from "../../components/core/playsongmodal/PlaySongModal";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [trendingSongs, setTrendingSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSongId, setSelectedSongId] = useState(null);
  const [selectedSong, setSelectedSong] = useState(null);
  const [isPlayModalOpen, setIsPlayModalOpen] = useState(false);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/songs/fetch-songs"
        );
        const songs = response.data;

        const formattedSongs = songs.map((song) => ({
          id: song.id,
          title: song.name,
          artist: song.artist_name,
          imageUrl: song.album_image,
          downloadUrl: song.audiodownload,
        }));

        setTrendingSongs(formattedSongs);
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
    const song = trendingSongs.find((song) => song.id === id);
    if (song) {
      setSelectedSong(song);
      setIsPlayModalOpen(true);
    }
  };

  const handleAdd = (id) => {
    setSelectedSongId(id); // Set the selected song ID
    setIsModalOpen(true); // Open the modal
  };

  const handleDownload = (downloadUrl) => {
    if (downloadUrl) {
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleMore = () => {
    console.log("Load more songs");
    navigate("/song");
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closePlayModal = () => {
    setIsPlayModalOpen(false);
  };

  return (
    <main className="bg-gray-100 text-gray-800 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-500 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">
            Discover Your Next Favorite Song
          </h1>
          <p className="text-lg mb-8">
            Explore a world of music and create your own playlists.
          </p>
          <button className="bg-white text-purple-600 font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-gray-200 transition duration-300">
            Explore Now
          </button>
        </div>
      </section>

      {/* Featured Playlists Section */}
      <section className="container mx-auto py-12">
        <h2 className="text-2xl font-bold mb-6">Featured Playlists</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
            <img
              src="https://images.jamendo.com/jamendomusic/home/home-explore-communities-tile-wide-lg.jpg"
              alt="Playlist 1"
              className="rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold">Chill Vibes</h3>
            <p className="text-gray-600">Relax with these chill tunes.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
            <img
              src="https://images.jamendo.com/jamendomusic/home/home-explore-playlists-tile-wide-lg.jpg"
              alt="Playlist 2"
              className="rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold">Workout Beats</h3>
            <p className="text-gray-600">
              Get pumped with these high-energy tracks.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
            <img
              src="https://images.jamendo.com/jamendomusic/home/home-explore-blog-tile-wide-lg.jpg"
              alt="Playlist 3"
              className="rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold">Top Hits</h3>
            <p className="text-gray-600">
              Stay up to date with the latest hits.
            </p>
          </div>
        </div>
      </section>

      {/* Song List Section */}
      <section className="container mx-auto py-12">
        <h2 className="text-2xl font-bold mb-6">Popular Songs</h2>
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <SongList
            songs={trendingSongs}
            onPlay={handlePlay}
            onAdd={handleAdd}
            onDownload={handleDownload}
            onMore={handleMore}
            showLoadMore={true}
          />
        )}
      </section>

      {/* Playlist Modal Component */}
      <PlaylistModal
        isOpen={isModalOpen}
        onClose={closeModal}
        songId={selectedSongId}
      />

      {/* Play Song Modal */}
      <PlaySongModal
        visible={isPlayModalOpen}
        onClose={closePlayModal}
        song={selectedSong}
      />

      {/* Footer Section */}
      <footer className="bg-gray-800 text-gray-400 py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 MusicApp. All rights reserved.</p>
          <div className="mt-4">
            <a href="#" className="text-gray-400 hover:text-white mx-2">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white mx-2">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default HomePage;
