import { useState, useEffect } from "react";
import axios from "axios";

export const Articles = () => {
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

  return (
    <>
      {articles.map((article) => (
        <div className='article' key={article.id}>
          <h2>{article.title}</h2>
          <img src={article.thumbnail} alt='' />
        </div>
      ))}
    </>
  );
};
