import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";
import "./giveaways.css";

export const Giveaways = () => {
  const [giveAways, setGiveAways] = useState([]);

  useEffect(() => {
    const fetchGiveAways = async () => {
      try {
        const response = await axios.get("https://www.mmobomb.com/api1/giveaways");
        console.log(response.data);
        setGiveAways(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchGiveAways();
  }, []);

  return (
    <>
      <Navbar />
      <div className="main-container">
        <h1>Giveaways</h1>
        <div className="give-aways-container">
          {giveAways.map((giveAway, index) => (
              <div className="give-away">
                {console.log(giveAway.keys_left.slice(0, -1))}
                <div className="title-container">
                  <p>{giveAway.title}</p>
                  <img src={giveAway.thumbnail} alt="Giveaway Thumbnail" />
                </div>
                <div className="give-away-details">
                  <p>Only {giveAway.keys_left} of Keys Left!</p>
                  <progress className="progress-bar" id="keys" value={giveAway.keys_left.slice(0, -1)} max="100">{giveAway.keys_left}</progress>
                  <a href={giveAway.giveaway_url}>Click Here to Redeem</a>
                </div>
              </div>
          ))}
          </div>
      </div>
    </>
  );
};
