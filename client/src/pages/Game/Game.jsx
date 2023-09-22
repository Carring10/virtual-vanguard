import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";
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
  });

  const location = useLocation();
  const gameId = location.state;
  console.log(gameId);

  const sanitizedData = () => ({
    __html: DOMPurify.sanitize(game.description),
  });

  useEffect(() => {
    const api = "https://www.mmobomb.com/api1/game?id=" + gameId;

    const fetchGame = async () => {
      try {
        const response = await axios.get(api);
        console.log(response.data);
        setGame(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchGame();
  }, [gameId]);

  console.log(game);

  return (
    <>
      <Navbar />
      <div className="game-container">
        <h1>{game.title}</h1>
        <div className="game-contents-container">
          <div className="game-info">
            <img src={game.thumbnail} alt="game-thumbnail" />
            <div className="studio-info">
              <p>Developer: {game.developer}</p>
              <p>Publisher: {game.publisher}</p>
              <p>Release Date: {game.release_date}</p>
            </div>
          </div>
          <div className="game-description">
            <div className="screenshots-container">
              {game.screenshots.map((screenshot) => (
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
