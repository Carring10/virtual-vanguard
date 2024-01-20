import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Navbar } from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import defaultPic from "../../images/default-pic.jpg";
import "./profile.css";

export const Profile = () => {
  const [file, setFile] = useState(null);
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const username = currentUser.username;
  const capitalizedUsername = username[0].toUpperCase() + username.slice(1);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/users/get/${username}`);
        setCurrentUser(response.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, [setCurrentUser, username]);

  const { data } = useQuery(["games"], () =>
  axios.get(`http://localhost:8800/games/getGames/${username}`).then((res) => {
    const data = res.data.games;
    console.log("DATA", data)
    return data;
  })
);

  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post("http://localhost:8800/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const updatePic = useMutation(
    (newPic) => {
      console.log(newPic);
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

    profileUrl = await upload(file);

    if (file) {
      updatePic.mutate({ username, profilePic: profileUrl });
    }

    window.location.reload();
  };

  const confirmFile = () => {
    if (file) {
      return (
        <div className="save-btn-container">
          <p className="file-name">{file.name} selected</p>
          <button className="save-btn" onClick={handleClick}>
            UPDATE
          </button>
        </div>
      );
    }
  };

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="profile-contents">
          <p className="profile-username">{capitalizedUsername}</p>
          <div className="profile-pic-container">
            <img
              src={"/upload/" + currentUser.profilePic}
              alt="Default"
              className="profile-pic"
            />
            <label className="overlay">
              <input
                type="file"
                id="profile"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
          </div>
          {confirmFile()}
        </div>
        <div className="savedGamesContainer">
          <h4>Your saved games</h4>
          {data.map((game) => (
            <div className="profile-game-container" key={game.gameId}>
              <img src={game.gameImg} alt="Game thumbnail" />
              <p>{game.gameTitle}</p>
              <p>{game.gameGenre}</p>
              <Link to={game.gameUrl} target="_blank" className="play-button">
              Play Now
            </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
