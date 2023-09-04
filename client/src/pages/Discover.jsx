import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

export const Discover = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchAllGames = async () => {
      try {
        const response = await axios.get(
          "https://www.mmobomb.com/api1/filter?tag=3d.mmorpg.fantasy.pvp&platform=pc"
        );
        setGames(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllGames();
  }, []);

  console.log(games);
  return (
    <>
      <h1>Discover Games</h1>
      <div className="search-params-container">
        <p>Genre</p>
        <div className="genre">
          <button>mmorpg</button>
          <button>shooter</button>
          <button>strategy</button>
          <button>moba</button>
          <button>racing</button>
          <button>sports</button>
          <button>survival</button>
          <button>mmo</button>
          <button>mmofps</button>
          <button>mmotps</button>
          <button>mmorts</button>
          <button>horror</button>
          <button>racing</button>
          <button>tower-defense</button>
          <button>card</button>
        </div>

        <div className="style">
          <p>Style</p>
          <button>sandbox</button>
          <button>open-world</button>
          <button>pvp</button>
          <button>pve</button>
          <button>pixel</button>
          <button>voxel</button>
          <button>turn-based</button>
          <button>top-down</button>
          <button>side-scroller</button>
        </div>

        <div className="theme">
          <p>Theme</p>
          <button>zombie</button>
          <button>space</button>
          <button>sailing</button>
          <button>superhero</button>
          <button>anime</button>
          <button>fantasy</button>
          <button>sci-fi</button>
          <button>fighting</button>
          <button>action</button>
          <button>military</button>
          <button>martial-arts</button>
          <button>flight</button>
        </div>
      </div>
    </>
  );
};
