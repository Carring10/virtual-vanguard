import { useContext } from "react";
import { AuthContext } from "../../src/context/authContext";

export const Comments = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="comments">
      <div className="write">
        <p>{currentUser.username}</p>
        <input type="text" placeholder="Write a comment" />
        <button>Send</button>
      </div>
    </div>
  )
}