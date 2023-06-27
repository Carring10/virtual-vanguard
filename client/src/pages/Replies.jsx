import { useContext, useState } from "react";
import { AuthContext } from "../../src/context/authContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment/moment";

export const Replies = (comment) => {
  const { currentUser } = useContext(AuthContext);
  // const userId = currentUser.id;
  const articleId = comment.data.articleId;

  const queryClient = useQueryClient();

  const getRelplies = async (comment) => {
    const parentId = comment.data.commentId;
    const repliesData = await axios.get(
      `http://localhost:8800/comments/${articleId}/${parentId}`
    );
    return repliesData;
  };

  const addReply = useMutation(
    (newComment) => {
      return axios.post("http://localhost:8800/comments", newComment, {
        withCredentials: true,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );

  const replyToComment = (comment) => {
    const userId = comment.data.userId;
    const content = comment.data.content;
    const parentId = comment.data.commentId;

    addReply.mutate({ userId, content, articleId, parentId });
  };

  const showRepliesButton = (comment) => {
    const replies = JSON.parse(comment.data.replies);
    
    if (replies != null) {
      const numReplies = replies.length;
      const buttonText =
        numReplies > 1 ? `Show ${numReplies} Replies` : `Show 1 Reply`;

      return <button onClick={() => getRelplies(comment)}>{buttonText}</button>;
    }
  };

  const replyButton = (comment) => {
    if (currentUser) {
      return <button onClick={() => replyToComment(comment)}>Reply</button>;
    }
  };

  return (
    <div>
      {currentUser && replyButton(comment)}
      {showRepliesButton(comment)}
    </div>
  );
};
