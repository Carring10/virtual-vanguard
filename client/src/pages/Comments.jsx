import { useContext, useState } from "react";
import { AuthContext } from "../../src/context/authContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from 'axios';

export const Comments = ({ articleId }) => {
  const [content, setContent] = useState("");
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser.id;

  // const { isLoading, error, data } = useQuery(["comments"], () => {
  //   axios.get("/comments?articleId=" + articleId).then((res) => {
  //     return res.data;
  //   });
  // });

  const queryClient = useQueryClient();

  // Mutation used to make changes to the server, provide data as 'newComment'
  const mutation = useMutation(
    (newComment) => {
      return axios.post("http://localhost:8800/comments", newComment);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );

  const handleClick = async (event) => {
    event.preventDefault();
    mutation.mutate({ userId, content, articleId });
    setContent("");
  };

  return (
    <div className="comments">
      <div className="write">
        <p>{currentUser.username}</p>
        <input
          type="text"
          placeholder="Write a comment"
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
        <button onClick={handleClick}>Send</button>
      </div>
    </div>
  );
};
