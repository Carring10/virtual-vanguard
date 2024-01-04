import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Navbar } from "../Navbar/Navbar";
import defaultPic from "../../images/default-pic.jpg";
import "./profile.css";

export const Profile = () => {
  const [file, setFile] = useState(null);
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser)

  const username = currentUser.username;
  const capitalizedUsername = username[0].toUpperCase() + username.slice(1);

  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      console.log(file);

      const res = await axios.post("http://localhost:8800/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const queryClient = useQueryClient();

  const updatePic = useMutation(
    (newPic) => {
      console.log(newPic)
      return axios.put("http://localhost:8800/users/updatePic", newPic);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["users"]);
      },
    }
  );

  const handleClick = async (event) => {
    event.preventDefault();
    let profileUrl;

    profileUrl = await upload(file)

    if (file) {
      updatePic.mutate({ username, profilePic:profileUrl });
    }
  };

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="profile-pic-container">
          <img src={"/upload/" + currentUser.profilePic} alt="Default" className="profile-pic" />
          <button onClick={handleClick}>Change Profile Picture</button>
          <input
            type="file"
            id="profile"
            // style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="user-info-container">
          <p>Username</p>
          <p>{capitalizedUsername}</p>
        </div>
      </div>
    </>
  );
};
