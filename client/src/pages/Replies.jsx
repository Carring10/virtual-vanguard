import { useContext, useState } from "react";
import { AuthContext } from "../../src/context/authContext";
import axios from "axios";
import moment from "moment/moment";
import { useQuery } from "@tanstack/react-query";
import { ReplyForm } from "./ReplyForm";

export const Replies = (comment) => {
  const articleId = comment.data.articleId;

  const getRelplies = (comment) => {
    const parentId = comment.data.commentId;
    axios
      .get(`http://localhost:8800/comments/${articleId}/${parentId}`)
      .then((repliesData) => {
        repliesElement(repliesData);
      });
  };

  const repliesElement = (repliesData) => {
    const replies = repliesData.data.replies;

    return (
      <div>
        {replies.map((reply) => (
          <div className="reply" key={reply.createdAt}>
            {console.log(reply.content)}
            <div className="reply-user-info">
              <h2>{reply.username}</h2>
              <p>{reply.content}</p>
            </div>
            <span className="reply-date">{moment(reply.createdAt).fromNow()}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="replies">

    </div>
  );
};
