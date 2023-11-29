import React, { useState } from "react";
import { useAuth } from "../provider/authProvider";
import { useNavigate } from "react-router-dom";
import AuthForm from "../forms/AuthForm";
import Authorization from "../models/authUser";

const Signup = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const INITIAL_STATE = {
    username: "",
    password: "",
  };
  const [userData, setUserData] = useState(INITIAL_STATE);
  const handleLogin = async (fData) => {
    setUserData(() => fData);
    setToken(await Authorization.signup(fData.username, fData.password));
    navigate("/", { replace: true });
    navigate(0);
  };

  return (
    <>
      <h1>Sign Up</h1>
      <AuthForm login={handleLogin} />
    </>
  );
};

export default Signup;
