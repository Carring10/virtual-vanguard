import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Navbar } from "../Navbar/Navbar";
import defaultPic from "../../images/default-pic.jpg";
import './profile.css';

export const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const username = currentUser.username;
  const capitalizedUsername = username[0].toUpperCase() + username.slice(1);
  
  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="profile-pic-container">
          <img src={defaultPic} alt="Default" className="profile-pic" />
          <button>Change Profile Picture</button>
        </div>
        <div className="user-info-container">
          <p>Username</p>
          <p>{capitalizedUsername}</p>
        </div>
      </div>
    </>
  );
};
