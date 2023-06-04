import React from "react";
import { Link } from "react-router-dom";

function isLoggedIn() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    return <Link>Logout</Link>;
  } else {
    return (
      <div>
        <Link to="/login">Sign In</Link>
        <p>{user && user.username}</p>
      </div>
    );
  }
}

export const Navbar = () => {
  return <>{isLoggedIn()}</>;
};
