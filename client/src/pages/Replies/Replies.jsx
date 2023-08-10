import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import moment from "moment/moment";
import { useQuery } from "@tanstack/react-query";
import "./replies.css";

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
      return (
        <button onClick={() => handleDelete(comment)} className="delete-reply">
          Delete
        </button>
      );
    }
  };

  return (
    <div className="replies">
      {data &&
        data.map((reply, index) => (
          <div className="reply-container" key={index}>
            {console.log(reply.content)}
            <span className="reply-user-icon">👤 </span>
            <div className="reply" key={reply.createdAt}>
              <div className="reply-user-info">
                <p className="reply-username">{reply.username}</p>
                <span className="reply-date">{moment(reply.createdAt).fromNow()}</span>
              </div>
              <p className="reply-content">{reply.content}</p>
              {currentUser && deleteButton(reply)}
            </div>
          </div>
        ))}
    </div>
  );
};
