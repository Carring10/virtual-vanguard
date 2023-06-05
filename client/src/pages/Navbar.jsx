import React from "react";
import { Link } from "react-router-dom";

const handleClick = (event) => {
  event.preventDefault();
  localStorage.clear();
  window.location.reload();
}

const isLoggedIn = () => {
  const user = JSON.parse(localStorage.getItem("user"));
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
}

export const Navbar = () => {
  return <>{isLoggedIn()}</>;
};
