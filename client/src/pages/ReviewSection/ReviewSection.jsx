import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Login } from "../Login/Login";
import { Review } from "../Review/Review";
import axios from "axios";

export const ReviewSection = ({ gameId }) => {
  const [content, setContent] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [recommended, setRecommended] = useState(false);
  console.log(recommended)

  const onClose = () => setIsOpen(false);
  const recommend = () => setRecommended(true);
  const notRecommended = () => setRecommended(false);

  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const { data } = useQuery(
    ["reviews"],
    () =>
      axios.get(`http://localhost:8800/reviews/${gameId}`).then((res) => {
        const data = res.data.reviews;
        console.log(data);
        return data;
      }),
    {
      enabled: !!gameId,
    }
  );

  const addReview = useMutation(
    (newReview) => {
      return axios.post("http://localhost:8800/reviews", newReview, {
        withCredentials: true,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["reviews"]);
      },
    }
  );

  const handleClick = async (event) => {
    event.preventDefault();
    if (currentUser) {
      const userId = currentUser.id;

      addReview.mutate({ userId, content, gameId, recommended });
      setContent("");
    } else {
      console.log("not logged in");
    }
  };

  const showSendButton = () => {
    if (content.length >= 1 && (document.getElementById('yes').checked || document.getElementById('no').checked)) {
      return (
        <button onClick={handleClick} className="send-comment">
          Send
        </button>
      );
    } else {
      return <button className="send-placeholder">Send</button>;
    }
  };

  const loginToComment = () => {
    if (currentUser) {
      const username = currentUser.username;
      const capitalizedUsername = username[0].toUpperCase() + username.slice(1);

      return (
        <div className="writeComment">
          <p className="comment-username">{currentUser && capitalizedUsername}</p>

          <div className="input-send-container">
            <textarea
              type="text"
              placeholder="Write a review"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              className="comment-input"
            />
            <div>
              <div>
                <p>Would you recommend this game?</p>
                <input type="radio" value="yes" onClick={recommend} name="recommend" id="yes" />
                <label>Yes</label>
                <input type="radio" value="no" onClick={notRecommended} name="recommend" id="no" />
                <label>No</label>
              </div>
              {showSendButton()}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <button className="comment-sign-in-button" onClick={() => setIsOpen(true)}>
          Sign in to leave a review
        </button>
      );
    }
  };

  return (
    <div className="review-section">
      {loginToComment()}
      <Login open={isOpen} onClose={onClose} />
      {data && data.map((review, index) => <Review review={review} key={index} />)}
    </div>
  );
};
