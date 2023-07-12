import React from "react";
import { Link, useLocation } from "react-router-dom";
import DOMPurify from "dompurify";
import { CommentSection } from "./CommentSection";

export const Article = () => {
  const location = useLocation();
  const propsData = location.state;

  // DOMPurify sanitizes HTML and prevents XSS attacks
  const sanitizedData = () => ({
    __html: DOMPurify.sanitize(propsData.article_content),
  });

  return (
    <>
      <Link to="/">Back</Link>
      <h1>{propsData.title}</h1>
      <div dangerouslySetInnerHTML={sanitizedData()} />
      <CommentSection articleId={propsData.id} />
    </>
  );
};
