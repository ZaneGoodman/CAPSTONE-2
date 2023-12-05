import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import AuthProvider from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";

test("renders Routes component with authentication", async () => {
  render(
    <AuthProvider initalState={{ token: "testToken", username: "bob" }}>
      <MemoryRouter>
        <ProtectedRoute />
      </MemoryRouter>
    </AuthProvider>
  );
});

//Snapshot test  <MemoryRouter>
it("Routes matches snapshot", async () => {
  const { asFragment } = render(
    <AuthProvider initalState={{ token: "testToken", username: "bob" }}>
      <MemoryRouter>
        <ProtectedRoute />
      </MemoryRouter>
    </AuthProvider>
  );
  await expect(asFragment()).toMatchSnapshot();
});
