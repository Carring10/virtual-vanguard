import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";
// import "./game.css";

export const Giveaways = () => {
  const [giveAways, setGiveAways] = useState([]);

  useEffect(() => {

    const fetchGiveAways = async () => {
      try {
        const response = await axios.get("https://www.mmobomb.com/api1/giveaways");
        console.log(response.data)
        setGiveAways(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchGiveAways();
  }, []);
  console.log(giveAways)

  return (
    <>
      <Navbar />
      <h1>Giveaways</h1>
    </>
  );
};
