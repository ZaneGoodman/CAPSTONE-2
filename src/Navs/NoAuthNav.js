import React from "react";
import { NavLink, Outlet } from "react-router-dom";
const NoAuthNav = () => {
  return (
    <div>
      <nav style={{ backgroundColor: "lightGrey" }}>
        <NavLink to="signup">Sign Up</NavLink>
        <NavLink to="login">Log In</NavLink>
      </nav>
    </div>
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
