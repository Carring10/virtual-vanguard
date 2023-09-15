import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";
import axios from "axios";
import DOMPurify from "dompurify";

export const Game = () => {
  const [game, setGame] = useState([]);

  const location = useLocation();
  const gameId = location.state;
  console.log(gameId)

  const sanitizedData = () => ({
    __html: DOMPurify.sanitize(game.description),
  });

  useEffect(() => {
    const api = "https://www.mmobomb.com/api1/game?id=" + gameId;

    const fetchGame = async () => {
      try {
        const response = await axios.get(api);
        console.log(response.data)
        setGame(response.data)
      } catch (err) {
        console.log(err);
      }
    };
    fetchGame();
  }, [gameId]);

  console.log(game)

  return (
    <>
    <Navbar />
    <div className="game-container">
      <h1>{game.title}</h1>
      <div dangerouslySetInnerHTML={sanitizedData()} />
    </div>
    </>
  )
}