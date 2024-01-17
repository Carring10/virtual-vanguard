import { useContext, useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../context/authContext";
import { useLocation } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";
import DOMPurify from "dompurify";
import "./game.css";

export const Game = () => {
  const [game, setGame] = useState({
    title: "",
    thumbnail: "",
    developer: "",
    publisher: "",
    release_date: "",
    screenshots: [],
    description: "",
    minimum_system_requirements: [],
  });

  const [bookmark, setBookmark] = useState(true);

  const { currentUser } = useContext(AuthContext);

  const location = useLocation();
  const gameId = location.state;

  const sanitizedData = () => ({
    __html: DOMPurify.sanitize(game.description),
  });

  useEffect(() => {
    const api = "https://www.mmobomb.com/api1/game?id=" + gameId;

    const fetchGame = async () => {
      try {
        const response = await axios.get(api);
        setGame(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchGame();
  }, [gameId]);

  const queryClient = useQueryClient();

  const saveGame = useMutation(
    (gameId) => {
      console.log(gameId);
      return axios.post("http://localhost:8800/games", gameId);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["games"]);
      },
    }
  );

  const handleSave = async (event) => {
    event.preventDefault();
    const gameId = game.id;
    const user = currentUser.username;
    setBookmark(false);

    saveGame.mutate({ user, savedGameId: gameId });
  };

  const saveButton = () => {
    if (currentUser) {
      return <i className="bx bx-bookmark-plus" id="bookmark" onClick={handleSave}></i>;
    }
  };

  console.log(game);

  return (
    <>
      <Navbar />
      <Link to="/discover" className="back-button">
        &#8592; Back
      </Link>
      <div className="game-container">
        <div className="game-contents-container">
          <div className="game-info">
            <div className="game-title-container">
            <h1 className="game-title">{game.title}</h1>
            
            {saveButton()}
            </div>
            <img src={game.thumbnail} alt="game-thumbnail" className="game-img" />
            <p>Developed by {game.developer}</p>
            <p>Released on {game.release_date}</p>
            <Link to={game.game_url} target="_blank" className="play-button">
              Play Now
            </Link>
          </div>
          <div className="game-description">
            <div className="screenshots-container">
              {game.screenshots.slice(0, 4).map((screenshot) => (
                <img
                  src={screenshot.image}
                  alt="game-screenshot"
                  className="game-screenshots"
                  key={screenshot.id}
                />
              ))}
            </div>
            <div dangerouslySetInnerHTML={sanitizedData()} />
          </div>
        </div>
      </div>
    </>
  );
};
