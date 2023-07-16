import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Comment } from "./Comment";

export const CommentSection = ({ articleId }) => {
  const [content, setContent] = useState("");

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

  return (
    <>
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

      <div className="comment-section">
        {data && data.map((comment, index) => <Comment comment={comment} key={index} />)}
      </div>
    </>
  );
};
