import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./navbar.css";

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

const isLoggedIn = () => {
  if (user) {
    return (
      <div>
        <button onClick={handleClick}>Logout</button>
        <p>{user.username}</p>
      </div>
    );
  } else {
    return <Link to="/login">Sign In</Link>;
  }
};

export const Navbar = () => {
  return (
    <div className="navbar">
      <header className="logo">
        <h1>👾 <span>V</span>IRTUAL <span>V</span>ANGUARD</h1>
      </header>
      {isLoggedIn()}
    </div>
  );
};
