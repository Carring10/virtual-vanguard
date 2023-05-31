import React from 'react'
import { useContext } from "react";
import { useState } from "react";
import { AuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'

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

  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await login(input);
      navigate('/');
    } catch (err) {
      console.log(err);
      setErr(err.response.data.message);
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <Link to="/register">Don't have an account? Click here to register</Link>
      <form>
        <input type='text' placeholder='Username' name='username' onChange={handleChange} />
        <input type='text' placeholder='Password' name='password' onChange={handleChange} />
        <button onClick={handleLogin}>Login</button>
        {/* If err is not null, render err message */}
        {err && err}
      </form>
    </div>
  )
}