import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [detailGames, setDetailGames] = useState(null);

  const navigate = useNavigate();

  const getUserEmail = async (emailUser) => {
    try {
      setLoading(true);
      const LOGIN_URL = `https://64b4c2160efb99d862693ca7.mockapi.io/users?email=`;
      const response = await axios.get(LOGIN_URL + emailUser);

      return response.data;
    } catch (err) {
      if (!err?.response) {
        setErrMsg(err);
      } else if (err.response?.status === 400) {
        setErrMsg("Bad Request Error");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
      return;
    }
  };

  const login = async () => {
    setErrMsg("");
    try {
      const users = await getUserEmail(email);
      if (users.length === 0) {
        setLoading(false);
        setErrMsg("Email not found");
        return; // Memberhentikan eksekusi jika email tidak ditemukan
      }

      const filteredUsers = users.filter((user) => user.password === pwd);

      if (filteredUsers.length > 0) {
        filteredUsers.forEach((element) => {
          setUserName(element.fullName);
          setAvatar(element.image);
          setUserEmail(element.email);
        });
        setEmail("");
        setPwd("");
        setLoading(false);
        setIsAuthenticated(true);
        navigate("/");
      } else {
        setErrMsg("Wrong password");
        setLoading(false);
      }
    } catch (err) {}
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserName("");
    setUserEmail("");
    setErrMsg("");
    navigate("/");
  };

  const authContextValue = {
    setEmail,
    setPwd,
    email,
    pwd,
    isAuthenticated,
    userName,
    userEmail,
    avatar,
    login,
    logout,
    errMsg,
    setErrMsg,
    loading,
    detailGames,
    setDetailGames,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
