import React from "react";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children, initalState }) => {
  const [token, setToken_] = useState(initalState.token);
  const [username, setUsername_] = useState(initalState.username);
  const setToken = (newToken) => {
    setToken_(newToken);
  };
  const setUsername = (newUsername) => {
    setUsername_(newUsername);
  };
  useEffect(() => {
    if (token && username) {
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
    }
  }, [token, username]);
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      username,
      setUsername,
    }),
    [token, username]
  );
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};
export default AuthProvider;
