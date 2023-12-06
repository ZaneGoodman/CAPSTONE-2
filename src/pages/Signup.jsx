import React, { useState } from "react";
import { useAuth } from "../provider/authProvider";
import { useNavigate } from "react-router-dom";
import AuthForm from "../forms/AuthForm";
import Authorization from "../models/authUser";
import "./Signup.css";
const Signup = () => {
  const { setToken, setUsername } = useAuth();
  const navigate = useNavigate();

  const INITIAL_STATE = {
    username: "",
    password: "",
  };
  const [userData, setUserData] = useState(INITIAL_STATE);
  //Login - Check for error, respond with errors if present.
  //log in user, add token and username, navigate home page
  const handleLogin = async (fData) => {
    setUserData(() => fData);
    const response = await Authorization.signup(fData.username, fData.password)
      .then((res) => setToken(res))
      .catch(() => "invalid");

    if (response === "invalid") {
      return "invalid";
    } else {
      setUsername(fData.username);
      navigate("/", { replace: true });
      navigate(0);
    }
  };
  return (
    <div className="Signup-background">
      <div className="Signup">
        <h1 className="Signup-header">Sign Up</h1>
        <AuthForm login={handleLogin} />
      </div>
    </div>
  );
};

export default Signup;
