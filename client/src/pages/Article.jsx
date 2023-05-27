import React from "react";
import { Link, useLocation } from "react-router-dom";
import DOMPurify from 'dompurify'

export const Article = () => {
  const location = useLocation();
  const propsData = location.state;

  // DOMPurify sanitizes HTML and prevents XSS attacks
  const sanitizedData = () => ({
    __html: DOMPurify.sanitize(propsData.article_content)
  })

  return (
    <>
      <h1>{propsData.title}</h1>
      <div dangerouslySetInnerHTML={sanitizedData()} />
    </>
  );
};
