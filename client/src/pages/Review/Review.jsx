import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment/moment";
import "./review.css";

export const Review = ({ review }) => {

  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const username = currentUser.username;
  const capitalizedUsername = username[0].toUpperCase() + username.slice(1);



  const deleteReview = useMutation(
    (deletedReview) => {
      return axios.delete(
        `http://localhost:8800/reviews/${deletedReview.id}/${deletedReview.userId}`
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["reviews"]);
      },
    }
  );

  const handleDelete = (review) => {
    const id = review.reviewId;
    const userId = currentUser.id;

    deleteReview.mutate({ id, userId });
  };

  const deleteButton = (review) => {
    const userId = currentUser.id;
    if (userId && userId === review.userId) {
      return (
        <button onClick={() => handleDelete(review)} className="delete-button">
        <i className="bx bx-trash" id="trash-icon"></i>{" "}Delete
      </button>
      );
    }
  };

  return (
    <>
      <div className="comment-container">
      <img src={"/upload/" + currentUser.profilePic} alt="Default" className="comment-profile-pic" />
        <div className="comment" key={review.createdAt}>
          <div className="user-info">
            <p className="comment-username">{capitalizedUsername}</p>
            <p className="date">{moment(review.createdAt).fromNow()}</p>
          </div>
          <p className="comment-content">{review.content}</p>
          <div className="reply-delete-buttons-container">
            {currentUser && deleteButton(review)}
          </div>
        </div>
      </div>
    </>
  );
};
