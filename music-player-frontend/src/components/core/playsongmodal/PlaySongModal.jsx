import React, { useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";

const PlaySongModal = ({ visible, onClose, song }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (visible && song) {
      audioRef.current.play();
    }
  }, [visible, song]);

  const handleClose = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    onClose();
  };

  if (!visible || !song) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl overflow-hidden relative w-full max-w-md">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black focus:outline-none"
          onClick={handleClose}
        >
          <FaTimes size={24} />
        </button>

        <img
          src={song.imageUrl}
          alt={song.title}
          className="w-full h-48 object-cover"
        />

        <div className="p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {song.title}
          </h2>
          <p className="text-lg text-gray-600 mb-4">By {song.artist}</p>

          <div className="flex items-center justify-center">
            <audio ref={audioRef} controls className="w-full">
              <source src={song.downloadUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaySongModal;
