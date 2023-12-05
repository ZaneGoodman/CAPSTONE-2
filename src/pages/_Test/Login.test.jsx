import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import AuthProvider from "../../provider/authProvider";
import Login from "../Login";
//Smoke test
test("renders Login component with authentication", async () => {
  render(
    <AuthProvider initalState={{ token: "testToken", username: "bob" }}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </AuthProvider>
  );
});

//Snapshot test
it("Login matches snapshot", async () => {
  const { asFragment } = render(
    <AuthProvider initalState={{ token: "testToken", username: "bob" }}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </AuthProvider>
  );
  await expect(asFragment()).toMatchSnapshot();
});
