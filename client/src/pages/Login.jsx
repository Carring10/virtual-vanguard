import { useContext } from "react";
import { useState, useRef, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const Login = ({ open, onClose }) => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const [err, setErr] = useState(null);

  const modalRef = useRef(null);
  console.log(modalRef);

  const { current: modal } = modalRef;

  if (open && modal) modal.showModal();

  const handleChange = (event) => {
    // Update the key-value object on each change, merging it with the previous input state
    setInput((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await login(input);
      navigate("/");
      window.location.reload();
    } catch (err) {
      console.log(err);
      setErr(err.response.data.message);
    }
  };

  const closeModal = () => {
    modal.close();
    onClose();
  };

  return (
    <dialog ref={modalRef}>
      <button onClick={() => closeModal()} type="button" className="close-button">
        X
      </button>
      <h1>Sign In</h1>
      <form>
        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />
        <button onClick={handleLogin} className="login-button">
          Sign In
        </button>
        <p>
          Don't have an account?<Link to="/register"> Create one</Link>
        </p>
        {/* If err is not null, render err message */}
        {err && err}
      </form>
    </dialog>
  );
};
