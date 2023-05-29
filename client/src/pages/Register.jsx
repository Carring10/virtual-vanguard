import React from 'react'
import { useState, useEffect } from "react";
import axios from 'axios';

export const Register = () => {
  const [input, setInput] = useState({
    username: '',
    password: ''
  });

  const handleChange = (event) => {
    setInput((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  console.log(input)

  const handleClick = async (event) => {
    event.preventDefault();

    try {
      await axios.post('http://localhost:8800/auth/register', input)
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <h1>Register</h1>
      <form>
        <input type='text' placeholder='Username' name='username' onChange={handleChange} />
        <input type='text' placeholder='Password' name='password' onChange={handleChange} />
        <button onClick={handleClick}>Register</button>
      </form>
    </div>
  )
}