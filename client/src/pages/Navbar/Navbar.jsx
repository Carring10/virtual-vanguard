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
  console.log(isOpen)

  const onClose = () => setIsOpen(false);

  const isLoggedIn = () => {
    if (user) {
      return (
        <div>
          <button onClick={handleClick}>Logout</button>
          <p className="username">{user.username}</p>
        </div>
      );
    } else {
      return <button onClick={() => setIsOpen(true)}>Sign In</button>;
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
          <Link>🌐 News</Link>
          <Link>🚀 Discover</Link>
          <Link>🎁 Giveaways</Link>
        </div>
        {isLoggedIn()}
      </div>
      <Login open={isOpen} onClose={onClose} />
    </>
  );
};
