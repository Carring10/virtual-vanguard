import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";
import "./discover.css";

export const Discover = () => {
  let [param, setParam] = useState("");
  let [games, setGames] = useState([]);

  let tagArray = [];

  useEffect(() => {
    const api = "https://www.mmobomb.com/api1/filter?tag=" + param;

    const fetchAllGames = async () => {
      try {
        const response = await axios.get(api);
        setGames(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    // Call fetchAllGames when param changes
    fetchAllGames();
  }, [param]);

  console.log("GAMES", games.status);
  const getTag = (event) => {
    const tags = event.target.textContent;
    const button = event.target;

    if (button.style.border === "2px solid green") {
      button.style.border = "";
      button.style.backgroundColor = "";

      setParam(param.replace("." + tags, ""));
    } else {
      button.style.border = "2px solid green";
      button.style.backgroundColor = "#05581a59";

      tagArray.push(tags);
    }

    tagArray.forEach((tag) => {
      setParam((prevParam) => prevParam + "." + tag);
    });
  };

  const showResults = () => {
    if (games.status === 0) {
      return (
        <div>
          <h2>No games match that description...</h2>
        </div>
      );
    } else {
      return (
        <div className="game-results-container">
          {games.map((game) => (
            <Link className="discover-game-container" to="/game" state={game.id}>
              <div className="game-contents">
                <img
                  src={game.thumbnail}
                  alt="Game Thumbnail"
                  className="game-thumbnail"
                />
                <div>
                  <h1 className="game-title">{game.title}</h1>
                  <p className="game-developer">{game.developer}</p>
                  <p className="discover-game-description">{game.short_description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      );
    }
  };

  return (
    <>
      <Navbar />
      <div className="discover-container">
        <div className="search-params-container">
          <div className="genre">
            <p>Genre</p>
            <button onClick={getTag}>mmorpg</button>
            <button onClick={getTag}>shooter</button>
            <button onClick={getTag}>strategy</button>
            <button onClick={getTag}>moba</button>
            <button onClick={getTag}>racing</button>
            <button onClick={getTag}>sports</button>
            <button onClick={getTag}>survival</button>
            <button onClick={getTag}>mmo</button>
            <button onClick={getTag}>mmofps</button>
            <button onClick={getTag}>mmotps</button>
            <button onClick={getTag}>mmorts</button>
            <button onClick={getTag}>racing</button>
          </div>

          <div className="style">
            <p>Style</p>
            <button onClick={getTag}>sandbox</button>
            <button onClick={getTag}>open-world</button>
            <button onClick={getTag}>pvp</button>
            <button onClick={getTag}>pve</button>
            <button onClick={getTag}>pixel</button>
            <button onClick={getTag}>voxel</button>
            <button onClick={getTag}>turn-based</button>
            <button onClick={getTag}>top-down</button>
            <button onClick={getTag}>side-scroller</button>
            <button onClick={getTag}>tower-defense</button>
            <button onClick={getTag}>card</button>
          </div>

          <div className="theme">
            <p>Theme</p>
            <button onClick={getTag}>horror</button>
            <button onClick={getTag}>zombie</button>
            <button onClick={getTag}>space</button>
            <button onClick={getTag}>sailing</button>
            <button onClick={getTag}>superhero</button>
            <button onClick={getTag}>anime</button>
            <button onClick={getTag}>fantasy</button>
            <button onClick={getTag}>sci-fi</button>
            <button onClick={getTag}>fighting</button>
            <button onClick={getTag}>action</button>
            <button onClick={getTag}>military</button>
            <button onClick={getTag}>martial-arts</button>
            <button onClick={getTag}>flight</button>
          </div>
        </div>
        {showResults()}
      </div>
    </>
  );
};
