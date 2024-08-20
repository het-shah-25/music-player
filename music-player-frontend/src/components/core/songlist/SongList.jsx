import React from "react";
import { FaPlus, FaDownload, FaPlay } from "react-icons/fa";

const SongList = ({
  songs,
  onPlay,
  onAdd,
  onDownload,
  onMore,
  showLoadMore,
}) => {
  return (
    <div className="bg-white p-6">
      <ul className="divide-y divide-gray-200">
        {songs.map((song) => (
          <li key={song.id} className="flex items-center py-4">
            <img
              src={song.imageUrl}
              alt={song.title}
              className="w-12 h-12 rounded-md mr-4"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{song.title}</h3>
              <p className="text-sm text-gray-500">{song.artist}</p>
            </div>
            <div className="flex items-center space-x-4">
              {onPlay && (
                <button
                  className="text-gray-500 hover:text-green-500 p-2 rounded-full transition duration-300"
                  onClick={() => onPlay(song.id)}
                >
                  <FaPlay className="text-2xl" />
                </button>
              )}
              {onAdd && (
                <button
                  className="text-gray-500 hover:text-green-500 p-2 rounded-full transition duration-300"
                  onClick={() => onAdd(song.id)}
                >
                  <FaPlus className="text-2xl" />
                </button>
              )}
              {onDownload && song.downloadUrl && (
                <button
                  className="text-gray-500 hover:text-blue-500 p-2 rounded-full transition duration-300"
                  onClick={() => onDownload(song.downloadUrl)}
                >
                  <FaDownload className="text-2xl" />
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
      {showLoadMore && (
        <button
          className="mt-4 bg-blue-500 text-white font-semibold px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
          onClick={onMore}
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default SongList;
