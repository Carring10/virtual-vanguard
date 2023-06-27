import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const user = JSON.parse(localStorage.getItem("user"));

const handleClick = async (event) => {
  event.preventDefault();
  localStorage.removeItem("user");

  try {
    await axios.delete("http://localhost:8800/auth/logout", {
      withCredentials: true
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
  return <>{isLoggedIn()}</>;
};
