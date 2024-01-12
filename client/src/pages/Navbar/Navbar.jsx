import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "./navbar.css";
import { Login } from "../Login/Login";
import { Link } from "react-router-dom";

const user = JSON.parse(sessionStorage.getItem("user"));

const toggleDropdown = function () {
  const dropdownMenu = document.getElementById("dropdown");
  const toggleArrow = document.getElementById("arrow");

  dropdownMenu.classList.toggle("show");
  toggleArrow.classList.toggle("arrow");
};

const showDropdownMenu = (event) => {
  event.stopPropagation();
  toggleDropdown();
};

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
      const username = user.username;
      const capitalizedUsername = username[0].toUpperCase() + username.slice(1);

      return (
        <>
          <div className="dropdown-container">
            <button className="btn" id="btn" onClick={showDropdownMenu}>
              {capitalizedUsername}
              <i className="bx bx-chevron-down" id="arrow"></i>
            </button>
            <div className="dropdown" id="dropdown">
              <a href="#logout" onClick={handleClick}>
                <i className="bx bx-log-out"></i>
                Logout
              </a>
              <a href="/profile">
                <i className="bx bx-user"></i>
                Profile
              </a>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <button onClick={() => setIsOpen(true)} className="nav-login-button">
          Sign In
        </button>
      );
    }
  };

  useEffect(() => {
    const newsLink = document.getElementById("news");
    const discoverLink = document.getElementById("discover");
    const giveawayLink = document.getElementById("giveaways");

    if (
      window.location.pathname === "/discover" ||
      window.location.pathname === "/game"
    ) {
      discoverLink.style.color = "white";
    }

    if (window.location.pathname === "/giveaways") {
      giveawayLink.style.color = "white";
    }

    if (window.location.pathname === "/") {
      newsLink.style.color = "white";
    }
  }, []);

  return (
    <>
      <div className="navbar">
        <header className="logo">
          <h1>
            <span>V</span>IRTUAL <span>V</span>ANGUARD
          </h1>
        </header>
        <div className="categories">
          <Link to="/" id="news">
            <i className="bx bx-news"></i> NEWS
          </Link>
          <Link to="/discover" id="discover">
            <i className="bx bx-rocket"></i> DISCOVER
          </Link>
          <Link to="/giveaways" id="giveaways">
            <i className="bx bx-gift"></i> GIVEAWAYS
          </Link>
        </div>
        {isLoggedIn()}
        {/* {focusLink()} */}
      </div>
      <Login open={isOpen} onClose={onClose} />
    </>
  );
};
