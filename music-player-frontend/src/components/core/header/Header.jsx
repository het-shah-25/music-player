import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaPlayCircle, FaUser, FaBars, FaTimes } from "react-icons/fa";
import useAxios from "../../../app/hook/useAxios";

const Header = ({ isLoggedIn }) => {
  const [userName, setUserName] = useState("");
  const axios = useAxios();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (isLoggedIn) {
        try {
          const response = await axios.get("/auth/me", null, true);
          setUserName(response.fullName); // Adjust based on API response
        } catch (error) {
          // Handle errors if needed
          console.error("Failed to fetch user data", error);
        }
      }
    };

    fetchUserData();
  }, [isLoggedIn, axios, userName]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-gray-200 shadow-md p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800">
          <Link to="/">Music Player</Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex space-x-4">
          <Link
            to="/"
            className="text-gray-600 hover:text-gray-900 flex items-center space-x-1"
          >
            <FaHome />
            <span>Home</span>
          </Link>
          <Link
            to="/playlists"
            className="text-gray-600 hover:text-gray-900 flex items-center space-x-1"
          >
            <FaPlayCircle />
            <span>Playlists</span>
          </Link>
        </nav>

        {/* User Info or Login */}
        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? (
            <div className="flex items-center space-x-2">
              <FaUser className="text-gray-600" />
              <span className="text-gray-800">{userName}</span>
            </div>
          ) : (
            <Link to="/login" className="text-gray-600 hover:text-gray-900">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600 hover:text-gray-900"
          onClick={toggleMenu}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <nav className="md:hidden mt-4 flex flex-col space-y-2">
          <Link
            to="/"
            className="text-gray-600 hover:text-gray-900 flex items-center space-x-1"
            onClick={toggleMenu}
          >
            <FaHome />
            <span>Home</span>
          </Link>
          <Link
            to="/playlists"
            className="text-gray-600 hover:text-gray-900 flex items-center space-x-1"
            onClick={toggleMenu}
          >
            <FaPlayCircle />
            <span>Playlists</span>
          </Link>
          {isLoggedIn ? (
            <div className="flex items-center space-x-2">
              <FaUser className="text-gray-600" />
              <span className="text-gray-800">{userName}</span>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-gray-600 hover:text-gray-900"
              onClick={toggleMenu}
            >
              Login
            </Link>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;
