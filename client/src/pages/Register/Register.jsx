import React from "react";
import { useState } from "react";
import axios from "axios";
import "./register.css";

export const Register = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const [confirmation, setConfirmation] = useState({
    confirm: "",
  });

  const matchPassword = () => {
    if (input.password !== confirmation.confirm) {
      return <p className="match-password-msg">🛈 Passwords must match</p>;
    }
  };

  const [err, setErr] = useState(null);

  const handleChange = (event) => {
    // Update the key-value object on each change, merging it with the previous input state
    setInput((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleConfirmation = (event) => {
    // Update the key-value object on each change, merging it with the previous input state
    setConfirmation((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleClick = async (event) => {
    event.preventDefault();

    try {
      await axios.post("http://localhost:8800/auth/register", input);
    } catch (err) {
      console.log(err);
      setErr(err.response.data.message);
    }
  };

  const validatePassword = () => {
    const password = input.password;
    const letter = document.getElementById("letter");
    const capital = document.getElementById("capital");
    const number = document.getElementById("number");
    const length = document.getElementById("length");

    // Validate lowercase letters
    const lowerCaseLetters = /[a-z]/;
    if (password.match(lowerCaseLetters)) {
      letter.classList.remove("invalid");
      letter.classList.add("valid");
    } else if (letter) {
      letter.classList.remove("valid");
      letter.classList.add("invalid");
    }

    // Validate capital letters
    const upperCaseLetters = /[A-Z]/;
    if (password.match(upperCaseLetters)) {
      capital.classList.remove("invalid");
      capital.classList.add("valid");
    } else if (capital) {
      capital.classList.remove("valid");
      capital.classList.add("invalid");
    }

    // Validate numbers
    const numbers = /[0-9]/;
    if (password.match(numbers)) {
      number.classList.remove("invalid");
      number.classList.add("valid");
    } else if (number) {
      number.classList.remove("valid");
      number.classList.add("invalid");
    }

    // Validate length
    if (password.length >= 8) {
      length.classList.remove("invalid");
      length.classList.add("valid");
    } else if (length) {
      length.classList.remove("valid");
      length.classList.add("invalid");
    }

    if (
      lowerCaseLetters.test(password) &&
      upperCaseLetters.test(password) &&
      numbers.test(password) &&
      password.length >= 8 &&
      input.password === confirmation.confirm
    ) {
      return <button onClick={handleClick} className="register-button">Register</button>;
    } else {
      return <button type="button" className="register-placeholder">Register</button>
    }
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <form className="register-form">
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
        <div style={{ width: "95% "}}>
        <input
          type="text"
          placeholder="Confirm password"
          name="confirm"
          id="confirm-password"
          onChange={handleConfirmation}
          style={{ width: "100% "}}
        />
        {matchPassword()}
        </div>
        <div id="password-requirements-container">
          <h3>Password must contain the following:</h3>
          <p id="letter" className="invalid">
            A <b>lowercase</b> letter
          </p>
          <p id="capital" className="invalid">
            A <b>capital (uppercase)</b> letter
          </p>
          <p id="number" className="invalid">
            A <b>number</b>
          </p>
          <p id="length" className="invalid">
            Minimum <b>8 characters</b>
          </p>
        </div>
        {validatePassword()}
        {/* If err is not null, render err message */}
        {err && err}
      </form>
    </div>
  );
};
