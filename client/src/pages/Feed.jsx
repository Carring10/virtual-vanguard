import { useState, useEffect } from "react";
import axios from "axios";

export const Feed = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchAllArticles = async () => {
      try {
        const response = await axios.get("https://www.mmobomb.com/api1/latestnews");
        setArticles(response.data);
        console.log(response.data)
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllArticles();
  }, []);

  function handleClick(event, index) {
    event.preventDefault();
    console.log(articles[index]);
  }

  return (
    <>
      {articles.map((article, index) => (
        <div className='article' key={article.id} index={index} onClick={(event) => handleClick(event, index)}>
          <h2>{article.title}</h2>
          <img src={article.thumbnail} alt='Game Thumbnail' />
        </div>
      ))}
    </>
  );
};
