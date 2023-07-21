import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Navbar } from "../Navbar";
import './feed.css';

export const Feed = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchAllArticles = async () => {
      try {
        const response = await axios.get("https://www.mmobomb.com/api1/latestnews");
        setArticles(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllArticles();
  }, []);

  return (
    <>
    <Navbar />
    <div className="article-container">
      {articles.map((article, index) => (
        <div className="article" key={article.id} index={index}>
          <Link to="/article" state={articles[index]} className="article-link">
            <h2 className="headline">{article.title}</h2>
            <img src={article.main_image} className="article-img" alt="Game Thumbnail" />
          </Link>
        </div>
      ))}
    </div>
    </>
  );
};
