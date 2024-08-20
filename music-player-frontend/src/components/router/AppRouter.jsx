import React, { useEffect, useState } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import HomePage from "../../pages/home/HomePage";
import PlaylistsPage from "../../pages/playlists/PlaylistsPage";
import SongPage from "../../pages/songpage/SongPage";
import LoginPage from "../../pages/login/LoginPage";
import SignupPage from "../../pages/signuppage/SignupPage";
import OtpVerificationPage from "../../pages/otpverificationpage/OtpVerificationPage";
import Header from "../core/header/Header";
import SongListPage from "../../pages/playlists/SongListPage";

const AppRouter = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);

  const AppRoutes = [
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/playlists",
      element: isLoggedIn ? <PlaylistsPage /> : <Navigate to="/login" />,
    },
    {
      path: "/song",
      element: <SongPage />,
    },
    {
      path: "/login",
      element: isLoggedIn ? <Navigate to="/" /> : <LoginPage />,
    },
    {
      path: "/signup",
      element: isLoggedIn ? <Navigate to="/" /> : <SignupPage />,
    },
    {
      path: "/otp-verification",
      element: <OtpVerificationPage />,
    },
    {
      path: "/songs/:playlistId",
      element: <SongListPage />,
    },
    {
      path: "*",
      element: <Navigate to="/" />,
    },
  ];

  const router = useRoutes(AppRoutes);

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} />
      {router}
    </div>
  );
};

export default AppRouter;
