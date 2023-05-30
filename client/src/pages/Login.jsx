import React from 'react'
import { useState } from "react";
import axios from 'axios';

export const Login = () => {
  const [input, setInput] = useState({
    username: '',
    password: ''
  });

  const [err, setErr] = useState(null);

  const handleChange = (event) => {
    // Update the key-value object on each change, merging it with the previous input state
    setInput((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  const handleClick = async (event) => {
    event.preventDefault();

    try {
      await axios.post('http://localhost:8800/auth/register', input)
    } catch (err) {
      console.log(err);
      setErr(err.response.data.message);
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form>
        <input type='text' placeholder='Username' name='username' onChange={handleChange} />
        <input type='text' placeholder='Password' name='password' onChange={handleChange} />
        <button onClick={handleClick}>Login</button>
        {/* If err is not null, render err message */}
        {err && err}
      </form>
    </div>
  )
}