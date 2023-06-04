import React from "react";
import { Link } from "react-router-dom";

function isLoggedIn() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    return (
      <div>
        <Link>Logout</Link>
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
