import React from "react";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import Logout from "../pages/Logout";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import UserNotes from "../pages/UserNotes";
import NotFound404 from "../pages/NotFound404";
import { AuthNavWrapper } from "../Navs/AuthNav";
import { NoAuthNavWrapper } from "../Navs/NoAuthNav";

const Routes = () => {
  // Routes that do not need authentication
  const routesForPublic = [
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "*",
      element: <NotFound404 />,
    },
  ];
  //Routes that require authentication
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/my-notes",
          element: <UserNotes />,
        },
        {
          path: "/logout",
          element: <Logout />,
        },
        {
          path: "*",
          element: <NotFound404 />,
        },
      ],
    },
  ];
  //Wrap each set of routes in their specific navbar
  const router = createBrowserRouter([
    {
      element: <NoAuthNavWrapper />,
      children: [...routesForPublic],
    },
    {
      path: "/",
      element: <AuthNavWrapper />,
      children: [...routesForAuthenticatedOnly],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Routes;
