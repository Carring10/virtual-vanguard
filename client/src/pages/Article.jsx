import React from "react";
import { Link, useLocation } from "react-router-dom";

export const Article = (props) => {
  const location = useLocation();
  const propsData = location.state;
  console.log(props);
  console.log(propsData);

  const htmlString = propsData.article_content;
  const parser = new DOMParser();
  // Use DOMParser to parse HTML string
  const doc = parser.parseFromString(htmlString, "text/html");
  // Obtain paragraph elements
  const paragraphElements = doc.getElementsByTagName("p");
  // Convert paragraphElements to an array
  const paragraphArray = Array.from(paragraphElements);

  return (
    <>
      <h1>{propsData.title}</h1>
      <img src={propsData.thumbnail} alt="Game Thumbnail" />
      {paragraphArray.map((paragraph) => (
        <>{paragraph.innerHTML}</>
      ))}
    </>
  );
};
