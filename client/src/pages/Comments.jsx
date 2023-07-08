import { useContext, useState } from "react";
import { AuthContext } from "../../src/context/authContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment/moment";
import { Replies } from "./Replies";
import { ReplyForm } from "./ReplyForm";

export const Comments = ({ articleId }) => {
  const [content, setContent] = useState("");
  const [showForm, setShowForm] = useState(false);

  const showReplyForm = () => setShowForm(true);
  const hideReplyForm = () => setShowForm(false);

  const { currentUser } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const { data } = useQuery(["comments"], () =>
    axios.get(`http://localhost:8800/comments/${articleId}`).then((res) => {
      const data = res.data.comments;
      return data;
    })
  );

  // Mutation used to make changes to the server, provide data as 'newComment'
  const addComment = useMutation(
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

  const deleteComment = useMutation(
    (deletedComment) => {
      return axios.delete(
        `http://localhost:8800/comments/${deletedComment.id}/${deletedComment.userId}`
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );

  const handleClick = async (event) => {
    event.preventDefault();
    if (currentUser) {
      const userId = currentUser.id;

      addComment.mutate({ userId, content, articleId });
      setContent("");
    } else {
      console.log("not logged in");
    }
  };

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
    console.log(comment)
    const replies = JSON.parse(comment.replies);

    if (replies != null) {
      const numReplies = replies.length;
      const buttonText = numReplies > 1 ? `Show ${numReplies} Replies` : `Show 1 Reply`;

      return <button>{buttonText}</button>;
    }
  };

  const replyButton = (comment) => {
    if (currentUser) {
      return <button onClick={() => showReplyForm(comment)}>Reply</button>;
    }
  };

  return (
    <div className="comments">
      <div className="writeComment">
        <p>{currentUser && currentUser.username}</p>
        <input
          type="text"
          placeholder="Write a comment"
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
        <button onClick={handleClick}>Send</button>
      </div>
      {data &&
        data.map((comment) => (
          <div className="comment" key={comment.createdAt}>
            <div className="user-info">
              <h2>{comment.username}</h2>
              <p>{comment.content}</p>
            </div>
            <span className="date">{moment(comment.createdAt).fromNow()}</span>
            {currentUser && deleteButton(comment)}
            {currentUser && replyButton(comment)}
            {showForm ? <ReplyForm comment={comment} hideReplyForm={hideReplyForm} /> : null}
            {showRepliesButton(comment)}
            {/* <Replies data={comment} /> */}
          </div>
        ))}
    </div>
  );
};
