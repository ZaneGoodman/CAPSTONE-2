import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import AuthProvider from "../../provider/authProvider";
import Signup from "../Signup";
//Smoke test
test("renders Signup component with authentication", async () => {
  render(
    <AuthProvider initalState={{ token: "testToken", username: "bob" }}>
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    </AuthProvider>
  );
});

//Snapshot test  <MemoryRouter>
it("Signup matches snapshot", async () => {
  const { asFragment } = render(
    <AuthProvider initalState={{ token: "testToken", username: "bob" }}>
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    </AuthProvider>
  );
  await expect(asFragment()).toMatchSnapshot();
});
