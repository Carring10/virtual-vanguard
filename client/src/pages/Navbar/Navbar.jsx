import React from "react";
import axios from "axios";
import { useState } from "react";
import "./navbar.css";
import { Login } from "../Login/Login";
import { Link } from "react-router-dom";

const user = JSON.parse(sessionStorage.getItem("user"));

const handleClick = async (event) => {
  event.preventDefault();
  sessionStorage.removeItem("user");

  try {
    await axios.delete("http://localhost:8800/auth/logout", {
      withCredentials: true,
    });

    window.location.reload();
  } catch (err) {
    console.log(err);
  }
};

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);

  const isLoggedIn = () => {
    if (user) {
      return (
        <div className="logout-container">
          <p className="username">{user.username}</p>
          <button onClick={handleClick} className="logout-button">
            Logout
          </button>
        </div>
      );
    } else {
      return (
        <button onClick={() => setIsOpen(true)} className="nav-login-button">
          Sign In
        </button>
      );
    }
  };

  const focusLink = () => {
    const newsLink = document.getElementById("news");
    const discoverLink = document.getElementById("discover");
    const giveawayLink = document.getElementById("giveaway");
    if (window.location.pathname === "/discover") {
      discoverLink.style.color = "white";
    } else if (window.location.pathname === "/giveaway") {
      giveawayLink.style.color = "white"
    } else {
      newsLink.style.color = "white";
    }
  };

  return (
    <>
      <div className="navbar">
        <header className="logo">
          <h1>
            <span>👾 V</span>IRTUAL <span>V</span>ANGUARD
          </h1>
        </header>
        <div className="categories">
          <Link to="/" id="news">
            🌐 News
          </Link>
          <Link to="/discover" id="discover">
            🚀 Discover
          </Link>
          <Link id="giveaway">🎁 Giveaways </Link>
        </div>
        {isLoggedIn()}
        {focusLink()}
      </div>
      <Login open={isOpen} onClose={onClose} />
    </>
  );
};
