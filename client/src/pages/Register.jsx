import React from 'react'
import { useState, useEffect } from "react";

export const Register = () => {
  const [input, setInput] = useState({
    username: '',
    password: ''
  });

  const handleChange = (event) => {
    setInput((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  console.log(input)

  return (
    <div>
      <h1>Register</h1>
      <form>
        <input type='text' placeholder='Username' name='username' onChange={handleChange} />
        <input type='text' placeholder='Password' name='password' onChange={handleChange} />
        <button>Register</button>
      </form>
    </div>
  )
}