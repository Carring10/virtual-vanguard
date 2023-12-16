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
  console.log(giveAways);

  return (
    <>
      <Navbar />
      <div className="giveaways-container">
        <h1>Giveaways</h1>
        {giveAways.map((giveAway, index) => (
          <div className="give-aways-container">
            <div>
              <p>{giveAway.title}</p>
              <img src={giveAway.thumbnail} alt="Giveaway Thumbnail" />
              <p>{giveAway.short_description}</p>
            </div>
            <div>
              <p>ONLY {giveAway.keys_left} OF KEYS LEFT!</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
