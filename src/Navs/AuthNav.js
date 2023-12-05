import React from "react";
import { NavLink, Outlet } from "react-router-dom";
const AuthNav = () => {
  return (
    <div>
      <nav style={{ backgroundColor: "lightBlue" }}>
        <NavLink to="/my-notes">My Notes</NavLink>
        <NavLink to="/">Rosary</NavLink>
        <NavLink to="logout">Log Out</NavLink>
      </nav>
    </div>
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
