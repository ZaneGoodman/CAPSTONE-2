import React from "react";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import Logout from "../pages/Logout";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import UserNotes from "../pages/UserNotes";
import { AuthNavWrapper } from "../Navs/AuthNav";
import { NoAuthNavWrapper } from "../Navs/NoAuthNav";

const Routes = () => {
  const routesForPublic = [
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
  ];
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
      ],
    },
  ];

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
