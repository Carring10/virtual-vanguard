import { useState, useEffect } from "react";
import axios from "axios";

export const Articles = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const response = await axios.get("https://www.mmobomb.com/api1/latestnews");
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllPosts();
  }, []);

  // return (
  //   <ul>
  //     {posts.map((post) => (
  //       <li key={post.id}>{post.title}</li>
  //     ))}
  //   </ul>
  // );
};
