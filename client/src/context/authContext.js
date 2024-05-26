import axios from "axios";
import {createContext, useEffect, useState } from "react";
import config from "../config";

export const AuthContext = createContext();
console.log(config.baseURL)
export const AuthContextProvider = ({ children }) => {
  // children refers to the nested components enclosed within <BrowserRouter>
  const [currentUser, setCurrentUser] = useState(
    // Check if there is a user
    JSON.parse(sessionStorage.getItem('user')) || null
  );

  const login = async (input) => {
    const res = await axios.post(`${config.baseURL}/auth/login`, input, {
      withCredentials: true,
      sameSite: "none"
    });
    setCurrentUser(res.data);
  }

  const register = async (input) => {
    const res = await axios.post(`${config.baseURL}/auth/register`, input);
    setCurrentUser(res.data);
  }
  
  useEffect(() => {
    // Write user object into session storage
    sessionStorage.setItem('user', JSON.stringify(currentUser));
  }, [currentUser]);
  
  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, login, register }}>
      {/* children allows the nested components to access the shared data provided by the context api */}
      {children}
    </AuthContext.Provider>
  )
}