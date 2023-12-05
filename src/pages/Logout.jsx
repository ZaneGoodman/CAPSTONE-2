import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";

const Logout = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = () => {
      setToken();
      navigate("/", { replace: true });
    };
    handleLogout();
  }, [setToken, navigate]);

  return <>Loading...</>;
};

export default Logout;
