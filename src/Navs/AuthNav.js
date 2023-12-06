import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./AuthNav.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
const AuthNav = () => {
  return (
    <Navbar expand="lg" className="AuthNav-nav">
      <Navbar.Brand href="/">Prayer Room{"📿"}</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="/my-notes" className="AuthNav-link">
          Journal
        </Nav.Link>
        <Nav.Link href="/" className="AuthNav-link">
          Rosary
        </Nav.Link>
        <Nav.Link href="logout" className="AuthNav-link">
          Log Out
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export const AuthNavWrapper = () => {
  return (
    <div>
      <AuthNav />
      <Outlet />
    </div>
  );
};

export default AuthNav;
