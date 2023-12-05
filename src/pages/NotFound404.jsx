import React from "react";
import { useNavigate, Link } from "react-router-dom";

const NotFound404 = () => {
  const navigate = useNavigate();
  setTimeout(() => {
    navigate("/", { replace: true });
  }, 2000);
  return (
    <>
      <h1>Sorry! This page doesn't exist</h1>
      <p>Redirecting.....</p>
    </>
  );
};

export default NotFound404;
