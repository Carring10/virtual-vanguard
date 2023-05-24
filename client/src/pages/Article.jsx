import React from "react";
import { Link, useLocation } from "react-router-dom";

export const Article = (props) => {
  const location = useLocation();
  const propsData = location.state;
  console.log(props);
  console.log(propsData);
  return (
    <>
      <h1>{propsData.title}</h1>
      <img src={propsData.thumbnail} alt="Game Thumbnail" />
      <div>{propsData.short_description}</div>
    </>
  );
};
