import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";
// import "./game.css";

export const Giveaways = () => {
  return <>
  <Navbar />
  <h1>Giveaways</h1>
  </>;
};
