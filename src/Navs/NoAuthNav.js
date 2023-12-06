import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./NoAuthNav.css";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const NoAuthNav = () => {
  return (
    <Navbar expand="lg" className="NoAuthNav-nav">
      <Navbar.Brand href="/">Prayer Room{"📿"}</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="signup" className="NoAuthNav-link">
          Sign Up
        </Nav.Link>
        <Nav.Link href="login" className="NoAuthNav-link">
          Log In
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export const NoAuthNavWrapper = () => {
  return (
    <div>
      <NoAuthNav />
      <Outlet />
    </div>
  );
};

export default NoAuthNav;
