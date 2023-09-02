import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

export const Discover = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchAllGames = async () => {
      try {
        const response = await axios.get("https://www.mmobomb.com/api1/filter?tag=3d.mmorpg.fantasy.pvp&platform=pc");
        setGames(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllGames();
  }, []);

  console.log(games)
  return <div>Discover</div>;
};
