import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment/moment";
import { Replies } from "./Replies";
import { ReplyForm } from "./ReplyForm";

export const Comment = ({ comment }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const showReplyForm = () => setShowForm(true);
  const hideReplyForm = () => setShowForm(false);

  const toggleShowReplies = () => setShowReplies(true);
  const toggleHideReplies = () => setShowReplies(false);

  const deleteComment = useMutation(
    (deletedComment) => {
      return axios.delete(
        `http://localhost:8800/comments/${deletedComment.id}/${deletedComment.userId}`
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments"]);
        queryClient.invalidateQueries(["replies"]);
      },
    }
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

  const showRepliesButton = (comment) => {
    const replies = JSON.parse(comment.replies);

    if (replies != null) {
      const numReplies = replies.length;
      const toggleText = showReplies ? "Hide" : "Show";
      const buttonText =
        numReplies > 1 ? `${toggleText} ${numReplies} Replies` : `${toggleText} 1 Reply`;

      const controlClick = showReplies ? () => toggleHideReplies() : () => toggleShowReplies();

      return <button onClick={controlClick}>{buttonText}</button>;
    }
  };

  const replyButton = (comment) => {
    if (currentUser) {
      return <button onClick={() => showReplyForm(comment)}>Reply</button>;
    }
  };

  return (
    <div className="comment" key={comment.createdAt}>
      <div className="user-info">
        <h2>{comment.username}</h2>
        <p>{comment.content}</p>
      </div>
      <span className="date">{moment(comment.createdAt).fromNow()}</span>
      {currentUser && deleteButton(comment)}
      {currentUser && replyButton(comment)}
      {showRepliesButton(comment)}
      {showForm ? <ReplyForm comment={comment} hideReplyForm={hideReplyForm} /> : null}
      {showReplies ? <Replies comment={comment} deleteComment={deleteComment} /> : null}
    </div>
  );
};
