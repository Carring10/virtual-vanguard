import { useState, useEffect } from "react";
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
        <div className="game-contents-container">
          <div className="game-info">
            <h1 className="game-title">{game.title}</h1>
            <img src={game.thumbnail} alt="game-thumbnail" className="game-img" />
            <p>Developed by {game.developer}</p>
            <p>Released on {game.release_date}</p>
            <Link to={game.game_url} target="_blank" className="play-button">
              Play Now
            </Link>
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
            <div className="more-game-info">
              <div className="system-requirements">
                <h3>Minimum System Requirements</h3>
                <li>{game.minimum_system_requirements.graphics}</li>
                <li>Memory: {game.minimum_system_requirements.memory}</li>
                <li>OS: {game.minimum_system_requirements.os}</li>
                <li>{game.minimum_system_requirements.processor}</li>
                <li>Storage: {game.minimum_system_requirements.storage}</li>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
