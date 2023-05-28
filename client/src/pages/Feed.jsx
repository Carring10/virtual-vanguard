import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { Navbar } from "./Navbar";

export const Feed = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchAllArticles = async () => {
      try {
        const response = await axios.get("https://www.mmobomb.com/api1/latestnews");
        setArticles(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllArticles();
  }, []);

  return (
    <>
    <Navbar />
      {articles.map((article, index) => (
        <div className="article" key={article.id} index={index}>
          <Link to="/article" state={articles[index]}>
            <h2>{article.title}</h2>
            <img src={article.thumbnail} alt="Game Thumbnail" />
          </Link>
        </div>
      ))}
    </>
  );
};
