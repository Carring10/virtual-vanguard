import { useContext, useState } from "react";
import { AuthContext } from "../../src/context/authContext";
import axios from "axios";
import moment from "moment/moment";
import { useQuery } from "@tanstack/react-query";
import { ReplyForm } from "./ReplyForm";

export const Replies = ({ comment, deleteComment }) => {
  const articleId = comment.articleId;
  const parentId = comment.commentId;

  const { currentUser } = useContext(AuthContext);

  const { data } = useQuery(["replies"], () =>
    axios.get(`http://localhost:8800/comments/${articleId}/${parentId}`).then((res) => {
      const data = res.data.replies;
      
      return data;
    })
  );

  const handleDelete = (comment) => {
    const id = comment.commentId;
    const userId = currentUser.id;

    deleteComment.mutate({ id, userId });
  };

  const deleteButton = (comment) => {
    const userId = currentUser.id;
    if (userId && userId === comment.userId) {
      return <button onClick={() => handleDelete(comment)}>Delete</button>;
    }
  };

  return (
    <div className="replies">
      {data &&
        data.map((reply) => (
          <div className="reply" key={reply.createdAt}>
            <div className="reply-user-info">
              <h2>{reply.username}</h2>
              <p>{reply.content}</p>
            </div>
            <span className="reply-date">{moment(reply.createdAt).fromNow()}</span>
            {currentUser && deleteButton(reply)}
          </div>
        ))}
    </div>
  );
};
