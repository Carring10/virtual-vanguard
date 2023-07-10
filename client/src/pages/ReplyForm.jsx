import { useContext, useState } from "react";
import { AuthContext } from "../../src/context/authContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const ReplyForm = ({ comment, hideReplyForm }) => {
  const [content, setContent] = useState("");

  const { currentUser } = useContext(AuthContext);

  const queryClient = useQueryClient();

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

  const handleClick = async (event) => {
    event.preventDefault();
    
    if (currentUser) {
      const userId = currentUser.id;
      const parentId = comment.commentId;
      const articleId = comment.articleId;
  
      addReply.mutate({ userId, content, articleId, parentId });
      setContent("");
    } else {
      console.log("not logged in");
    }
  };

  return (
    <div className="writeReply">
    <p>{currentUser && currentUser.username}</p>
    <input
      type="text"
      placeholder="Write a Reply"
      value={content}
      onChange={(event) => setContent(event.target.value)}
    />
    <button onClick={handleClick}>Send</button>
    <button onClick={() => hideReplyForm()}>Cancel</button>
  </div>
  )
}