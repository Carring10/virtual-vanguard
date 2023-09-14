import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

export const Game = () => {
  const location = useLocation();
  const gameId = location.state;
  console.log(gameId)

  useEffect(() => {
    const api = "https://www.mmobomb.com/api1/game?id=" + gameId;

    const fetchGame = async () => {
      try {
        const response = await axios.get(api);
        console.log(response.data)
      } catch (err) {
        console.log(err);
      }
    };
    // Call fetchGame when param changes
    fetchGame();
  }, []);

  return <h1>game</h1>
}