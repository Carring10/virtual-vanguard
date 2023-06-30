import { useContext, useState } from "react";
import { AuthContext } from "../../src/context/authContext";
import axios from "axios";
import moment from "moment/moment";
import { ReplyForm } from "./ReplyForm";

export const Replies = (comment) => {
  const [showForm, setShowForm] = useState(false);

  const { currentUser } = useContext(AuthContext);
  // const userId = currentUser.id;
  const articleId = comment.data.articleId;

  const getRelplies = async (comment) => {
    const parentId = comment.data.commentId;
    const repliesData = await axios.get(
      `http://localhost:8800/comments/${articleId}/${parentId}`
    );
    return repliesData;
  };

  const showReplyForm = () => setShowForm(true);
  
  const hideReplyForm = () => setShowForm(false);

  const repliesButton = (comment) => {
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
      return <button onClick={() => showReplyForm(comment)}>Reply</button>;
    }
  };

  return (
    <div>
      {currentUser && replyButton(comment)}
      {repliesButton(comment)}
      {showForm ? <ReplyForm comment={comment} hideReplyForm={hideReplyForm} /> : null}
    </div>
  );
};
