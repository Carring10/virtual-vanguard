import { useContext, useState } from "react";
import { AuthContext } from "../../src/context/authContext";
import axios from "axios";
import moment from "moment/moment";
import { ReplyForm } from "./ReplyForm";

export const Replies = (comment) => {
  const [showForm, setShowForm] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const { currentUser } = useContext(AuthContext);
  // const userId = currentUser.id;
  const articleId = comment.data.articleId;

  const showReplyForm = () => setShowForm(true);

  const hideReplyForm = () => setShowForm(false);

  const repliesButton = (comment) => {
    const replies = JSON.parse(comment.data.replies);

    if (replies != null) {
      const numReplies = replies.length;
      const buttonText = numReplies > 1 ? `Show ${numReplies} Replies` : `Show 1 Reply`;

      return <button onClick={() => setShowReplies(true)}>{buttonText}</button>;
    }
  };

  const getRelplies = (comment) => {
    const parentId = comment.data.commentId;

    axios
      .get(`http://localhost:8800/comments/${articleId}/${parentId}`)
      .then((repliesData) => {
        const replies = repliesData.data.replies;
        console.log(replies);
        return (
          <div>
            {replies.map((reply) => (
              <div className="reply" key={reply.createdAt}>
                <div className="reply-user-info">
                  <h2>{reply.username}</h2>
                  <p>{reply.content}</p>
                </div>
                <span className="reply-date">{moment(reply.createdAt).fromNow()}</span>
              </div>
            ))}
          </div>
        );
      });
  };

  const replyButton = (comment) => {
    if (currentUser) {
      return <button onClick={() => showReplyForm(comment)}>Reply</button>;
    }
  };

  return (
    <div>
      {currentUser && replyButton(comment)}
      {showReplies ? getRelplies(comment) : repliesButton(comment)}
      {showForm ? <ReplyForm comment={comment} hideReplyForm={hideReplyForm} /> : null}
    </div>
  );
};
