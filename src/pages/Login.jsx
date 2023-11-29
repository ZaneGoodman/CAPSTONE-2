import React, { useState } from "react";
import { useAuth } from "../provider/authProvider";
import { useNavigate, Link } from "react-router-dom";
import AuthForm from "../forms/AuthForm";
import Authorization from "../models/authUser";

const Login = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  // const newToken = await Authorization.login(
  //   userData.username,
  //   userData.password
  // );
  const INITIAL_STATE = {
    username: "",
    password: "",
  };
  const [userData, setUserData] = useState(INITIAL_STATE);

  const handleLogin = async (fData) => {
    setUserData(() => fData);
    setToken(await Authorization.login(fData.username, fData.password));
    navigate("/", { replace: true });
    navigate(0);
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
