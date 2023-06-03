import React from "react";
import { Link } from "react-router-dom";

const user = JSON.parse(localStorage.getItem("user"));

export const Navbar = () => {
  return (
    <>
      <div>
        <Link to="/login">Sign In</Link>
        <p>{user && user.username}</p>
      </div>
    </>
  );
};
