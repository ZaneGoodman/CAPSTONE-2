import React from "react";
import { render } from "@testing-library/react";

import AuthProvider from "../provider/authProvider";
import Routes from "./index";

test("renders Routes component with authentication", async () => {
  render(
    <AuthProvider initalState={{ token: "testToken", username: "bob" }}>
      <Routes />
    </AuthProvider>
  );
});

//Snapshot test
it("Routes matches snapshot", async () => {
  const { asFragment } = render(
    <AuthProvider initalState={{ token: "testToken", username: "bob" }}>
      <Routes />
    </AuthProvider>
  );
  await expect(asFragment()).toMatchSnapshot();
});
