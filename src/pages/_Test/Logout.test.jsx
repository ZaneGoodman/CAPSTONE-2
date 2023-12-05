import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import AuthProvider from "../../provider/authProvider";
import Logout from "../Logout";
//Smoke test
test("renders Logout component with authentication", async () => {
  render(
    <AuthProvider initalState={{ token: "testToken", username: "bob" }}>
      <MemoryRouter>
        <Logout />
      </MemoryRouter>
    </AuthProvider>
  );
});

//Snapshot test
it("Logout matches snapshot", async () => {
  const { asFragment } = render(
    <AuthProvider initalState={{ token: "testToken", username: "bob" }}>
      <MemoryRouter>
        <Logout />
      </MemoryRouter>
    </AuthProvider>
  );
  await expect(asFragment()).toMatchSnapshot();
});
