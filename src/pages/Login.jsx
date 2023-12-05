import React, { useState } from "react";
import { useAuth } from "../provider/authProvider";
import { useNavigate, Link } from "react-router-dom";
import AuthForm from "../forms/AuthForm";
import Authorization from "../models/authUser";

const Login = () => {
  const { token, setToken, setUsername } = useAuth();

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
    const response = await Authorization.login(fData.username, fData.password)
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
    <>
      <h1>Welcome to the Prayer Room </h1>
      <h2>Come pray the rosary with us</h2>
      <AuthForm login={handleLogin} />
      <span>
        Dont have an account? <Link to={"/signup"}>Sign up</Link>
      </span>
    </>
  );
};

export default Login;
